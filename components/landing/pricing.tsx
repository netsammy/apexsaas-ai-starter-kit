"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"starter" | "unlimited">("starter");

  return (
    <section id="pricing" className="py-24 border-t border-zinc-800/60 relative">
      {/* Background ambient lighting */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 text-indigo-400 border-indigo-500/20 bg-indigo-500/10">
            Simple, Transparent Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Pay once. Build and launch forever.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            No subscriptions or hidden fees. Download the complete production codebase today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <Card className="border-zinc-800 bg-zinc-900/50 flex flex-col justify-between hover:border-zinc-700 transition">
            <CardHeader className="p-8">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className="font-mono text-xs">Single Project</Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-white">ApexSaaS AI Starter</CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                Perfect for solo developers and indie hackers launching their first AI project.
              </CardDescription>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-white">$79</span>
                <span className="ml-2 text-sm text-zinc-400 font-medium">one-time payment</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0">
              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Full Next.js 15 App Router source code</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Google Gemini 2.0 & OpenAI Streaming routes</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Supabase Auth & Database schema with triggers</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stripe Subscriptions & Webhook sync</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Complete Dashboard UI & AI chat interface</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Single commercial application license</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-0">
              <a href="https://samabdus.gumroad.com/l/apexsaas-ai" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full h-12 text-base border-zinc-700 hover:bg-zinc-800">
                  Buy Starter Kit ($79)
                </Button>
              </a>
            </CardFooter>
          </Card>

          {/* Unlimited Pro Plan */}
          <Card className="border-indigo-500/50 bg-gradient-to-b from-indigo-950/20 via-zinc-900/60 to-zinc-900/80 flex flex-col justify-between relative shadow-2xl shadow-indigo-950/50">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-1 text-xs shadow-md">
                <Sparkles className="w-3 h-3 mr-1" /> MOST POPULAR
              </Badge>
            </div>
            <CardHeader className="p-8">
              <div className="flex justify-between items-center mb-2">
                <Badge variant="secondary" className="font-mono text-xs bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                  Unlimited Projects
                </Badge>
              </div>
              <CardTitle className="text-2xl font-bold text-white">ApexSaaS AI Unlimited Pro</CardTitle>
              <CardDescription className="text-zinc-400 mt-2">
                For serial founders and dev agencies building multiple micro-SaaS apps for clients.
              </CardDescription>
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight text-white">$149</span>
                <span className="ml-2 text-sm text-zinc-400 font-medium">one-time payment</span>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8 pt-0">
              <ul className="space-y-3.5 text-sm text-zinc-300">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Everything in Starter Kit</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited commercial SaaS projects</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Client build rights (Sell apps to clients)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Prioritized GitHub repository updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>AI Prompt Engineering Master templates</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct developer onboarding support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-8 pb-8 pt-0">
              <a href="https://samabdus.gumroad.com/l/apexsaas-ai" target="_blank" rel="noopener noreferrer" className="w-full">
                <Button className="w-full h-12 text-base shadow-lg shadow-indigo-600/30">
                  Get Unlimited Pro ($149)
                </Button>
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
