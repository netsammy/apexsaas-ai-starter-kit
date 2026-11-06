"use client";

import { useState } from "react";
import { CreditCard, Check, Sparkles, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleCheckout = async (planKey: string) => {
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePortal = async () => {
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <CreditCard className="w-8 h-8 text-indigo-400" />
          Subscription & Billing
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage your subscription tier, billing portal, and recurring credit allocations.
        </p>
      </div>

      {/* Current Status Banner */}
      <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Current Plan:</span>
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              Starter Free Tier
            </Badge>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            You have 50 starter credits. To automate higher throughput, select a subscription below.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handlePortal} className="border-zinc-700 hover:bg-zinc-800">
          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
          Manage Invoices & Billing Portal
        </Button>
      </div>

      {/* Subscription Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Starter Plan */}
        <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col justify-between">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-bold text-white">Starter Plan</CardTitle>
            <CardDescription className="text-xs text-zinc-400 mt-1">For casual makers and test projects</CardDescription>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-extrabold text-white">$19</span>
              <span className="ml-1 text-xs text-zinc-400">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 space-y-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>500 AI generation credits / month</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Gemini 2.0 Flash access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Standard API latency</span>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button
              variant="outline"
              disabled={loadingPlan === "starter"}
              onClick={() => handleCheckout("starter")}
              className="w-full text-xs border-zinc-700"
            >
              {loadingPlan === "starter" ? "Redirecting to Stripe..." : "Upgrade to Starter ($19/mo)"}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-indigo-500/50 bg-gradient-to-b from-indigo-950/20 to-zinc-900/80 flex flex-col justify-between shadow-xl shadow-indigo-950/40 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold">
              RECOMMENDED
            </Badge>
          </div>
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-bold text-white">Pro Plan</CardTitle>
            <CardDescription className="text-xs text-zinc-400 mt-1">For power users and scaling apps</CardDescription>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-extrabold text-white">$49</span>
              <span className="ml-1 text-xs text-zinc-400">/ month</span>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 space-y-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-white">2,000 AI credits / month</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full GPT-4o & Gemini 2.0 access</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Priority token generation throughput</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Priority email support</span>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button
              disabled={loadingPlan === "pro"}
              onClick={() => handleCheckout("pro")}
              className="w-full text-xs shadow-md shadow-indigo-600/30"
            >
              {loadingPlan === "pro" ? "Redirecting to Stripe..." : "Upgrade to Pro ($49/mo)"}
            </Button>
          </CardFooter>
        </Card>

        {/* Lifetime Plan */}
        <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col justify-between">
          <CardHeader className="p-6">
            <CardTitle className="text-xl font-bold text-white">Lifetime Pass</CardTitle>
            <CardDescription className="text-xs text-zinc-400 mt-1">One-time payment, lifetime perks</CardDescription>
            <div className="mt-4 flex items-baseline">
              <span className="text-3xl font-extrabold text-white">$199</span>
              <span className="ml-1 text-xs text-zinc-400">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-0 space-y-3 text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>10,000 lifetime credit package</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All future AI engine upgrades</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No recurring monthly charge</span>
            </div>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button
              variant="outline"
              disabled={loadingPlan === "lifetime"}
              onClick={() => handleCheckout("lifetime")}
              className="w-full text-xs border-zinc-700"
            >
              {loadingPlan === "lifetime" ? "Redirecting to Stripe..." : "Get Lifetime ($199)"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
