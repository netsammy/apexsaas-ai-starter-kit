import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/25 to-purple-600/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Release Announcement Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="outline" className="px-3.5 py-1 text-sm border-indigo-500/30 bg-indigo-500/10 text-indigo-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-400 animate-pulse" />
            Next.js 15 App Router & React 19 Ready
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Launch your AI Micro-SaaS in{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            24 Hours
          </span>
          , not 3 months.
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Stop rebuilding authentication, Stripe billing webhooks, database triggers, and AI streaming glue code. ApexSaaS AI is the battle-tested starter kit designed to turn your AI prototype into paying MRR today.
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="#pricing">
            <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 shadow-xl shadow-indigo-600/25">
              Get Instant Access
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/dashboard/ai-generator">
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-7 h-12">
              <Zap className="mr-2 w-4 h-4 text-amber-400" />
              Live Interactive Demo
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-zinc-800/80 max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-xs sm:text-sm text-zinc-400">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Supabase Auth & RLS</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Stripe Webhooks & Portal</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Gemini 2.0 & OpenAI Stream</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Lifetime License</span>
          </div>
        </div>

        {/* Mockup Preview Card */}
        <div className="mt-14 relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800/60 bg-zinc-950/70 rounded-t-xl text-xs text-zinc-500 font-mono">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="ml-2 text-zinc-400">app.your-saas.com/dashboard/ai-generator</span>
          </div>
          <div className="p-6 md:p-8 bg-zinc-950/40 rounded-b-xl text-left grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/70">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Live Credit Balance</span>
                <div className="text-2xl font-bold text-white mt-1">42 / 50 Credits</div>
                <div className="mt-2 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "84%" }}></div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/70">
                <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Active Plan</span>
                <div className="text-base font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Pro Tier ($49/mo)
                </div>
                <p className="text-xs text-zinc-400 mt-1">Next bill renewal in 28 days via Stripe</p>
              </div>
            </div>
            <div className="md:col-span-2 p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                  <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Gemini 2.0 Flash Stream
                  </span>
                  <span className="text-zinc-500 font-mono">248 tokens/sec</span>
                </div>
                <div className="mt-4 text-sm text-zinc-300 font-mono space-y-2 leading-relaxed">
                  <p className="text-indigo-300">Prompt: "Generate a high-converting cold email for B2B SaaS founders..."</p>
                  <p className="text-zinc-400">Response: "Subject: Quick question regarding your onboarding churn rate..."</p>
                  <p className="text-zinc-500 text-xs italic">[Automated debit: -1 credit recorded in PostgreSQL]</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-3 border-t border-zinc-800/80 text-xs text-zinc-500">
                <span>Latency: 180ms</span>
                <span className="text-emerald-400 font-medium">Status: HTTP 200 OK</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
