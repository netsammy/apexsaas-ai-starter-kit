import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/config";
import { createAdminClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing webhook secret or signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  const admin = createAdminClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id;
        const planTier = session.metadata?.plan_tier || "starter";

        if (userId) {
          // Grant plan credits based on tier
          const creditAmounts: Record<string, number> = {
            starter: 500,
            pro: 2500,
            lifetime: 10000,
          };
          const creditsToGrant = creditAmounts[planTier] || 500;

          const { data: profile } = await admin
            .from("profiles")
            .select("credits_balance")
            .eq("id", userId)
            .single();

          if (profile) {
            await admin
              .from("profiles")
              .update({
                credits_balance: profile.credits_balance + creditsToGrant,
                stripe_customer_id: session.customer as string,
              })
              .eq("id", userId);

            await admin.from("credit_transactions").insert({
              user_id: userId,
              amount: creditsToGrant,
              type: "subscription_grant",
              description: `Initial credit grant for ${planTier} plan`,
            });
          }

          // If recurring subscription, track it
          if (session.subscription) {
            const sub = await stripe.subscriptions.retrieve(session.subscription as string);
            await admin.from("subscriptions").upsert({
              user_id: userId,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: sub.id,
              stripe_price_id: sub.items.data[0].price.id,
              plan_tier: planTier,
              status: sub.status,
              current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
              current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
              cancel_at_period_end: sub.cancel_at_period_end,
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await admin
          .from("subscriptions")
          .update({
            status: sub.status,
            current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end,
          })
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await admin
          .from("subscriptions")
          .update({ status: "canceled" })
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      default:
        // Other events ignored
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Error processing Stripe webhook:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
