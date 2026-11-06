import Stripe from "stripe";
import { PlanConfig } from "@/types";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export const PLANS: PlanConfig[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for indie creators & solo builders getting started with AI.",
    priceMonthly: 19,
    priceYearly: 190,
    creditsPerMonth: 500,
    stripePriceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "price_starter_monthly",
    stripePriceIdYearly: "price_starter_yearly",
    features: [
      "500 AI Generations / month",
      "Access to Gemini 2.0 Flash & GPT-4o-mini",
      "Standard response speed",
      "Community support",
      "1 Project workspace"
    ]
  },
  {
    id: "pro",
    name: "Pro Builder",
    description: "For founders, power users, and agencies shipping production AI products.",
    priceMonthly: 49,
    priceYearly: 490,
    creditsPerMonth: 2500,
    stripePriceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    stripePriceIdYearly: "price_pro_yearly",
    popular: true,
    features: [
      "2,500 AI Generations / month",
      "Access to Gemini 1.5 Pro & GPT-4o",
      "High-speed streaming endpoints",
      "Priority customer support",
      "Unlimited project workspaces",
      "API & Webhook integrations"
    ]
  },
  {
    id: "lifetime",
    name: "Founder Lifetime",
    description: "One-time payment for lifetime access and VIP perks.",
    priceMonthly: 199,
    priceYearly: 199,
    creditsPerMonth: 10000,
    stripePriceIdMonthly: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || "price_lifetime_deal",
    stripePriceIdYearly: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID || "price_lifetime_deal",
    features: [
      "10,000 AI Generations upfront",
      "Lifetime updates to all future features",
      "Private Discord mastermind channel",
      "1-on-1 architecture review call",
      "Commercial SaaS license"
    ]
  }
];
