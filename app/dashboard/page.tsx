import Link from "next/link";
import { Sparkles, Bot, CreditCard, ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Welcome to your ApexSaaS AI workspace. Manage your AI credits and live generations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/ai-generator">
            <Button className="shadow-lg shadow-indigo-600/20">
              <Bot className="w-4 h-4 mr-2" />
              Open AI Generator
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="p-6 pb-2">
            <CardDescription className="text-xs uppercase font-medium text-zinc-400">Available Credits</CardDescription>
            <CardTitle className="text-3xl font-extrabold text-white mt-1">50 Credits</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-2">
            <p className="text-xs text-zinc-500">Free starter tier balance</p>
            <div className="mt-3 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: "100%" }}></div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="p-6 pb-2">
            <CardDescription className="text-xs uppercase font-medium text-zinc-400">Subscription Status</CardDescription>
            <CardTitle className="text-3xl font-extrabold text-emerald-400 mt-1 flex items-center gap-2">
              Free Trial
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-2">
            <p className="text-xs text-zinc-500">Upgrade to Pro for 2,000 monthly credits</p>
            <Link href="/dashboard/billing" className="inline-flex items-center text-xs text-indigo-400 hover:text-indigo-300 font-medium mt-3">
              Upgrade subscription <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </CardContent>
        </Card>

        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader className="p-6 pb-2">
            <CardDescription className="text-xs uppercase font-medium text-zinc-400">Active AI Engines</CardDescription>
            <CardTitle className="text-3xl font-extrabold text-indigo-400 mt-1">2 Engines</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-2">
            <p className="text-xs text-zinc-500">Gemini 2.0 Flash & GPT-4o-mini online</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary" className="text-[10px] bg-indigo-500/10 text-indigo-300 border-indigo-500/30">Google GenAI</Badge>
              <Badge variant="secondary" className="text-[10px] bg-purple-500/10 text-purple-300 border-purple-500/30">OpenAI</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Launch & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-lg font-bold text-white mb-2">Live AI Generator Quick-Test</h2>
            <p className="text-sm text-zinc-400 mb-4">
              Your boilerplate includes full streaming API routes wired directly to Supabase authentication and credit debits.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Fast Token Streaming with HTTP ReadableStream</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Automated credit audit trail in PostgreSQL</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">Zero cold-start edge compatible routes</span>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/dashboard/ai-generator">
                <Button size="sm">Launch Interactive Generator</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40">
            <h2 className="text-lg font-bold text-white mb-2">Need more credits?</h2>
            <p className="text-xs text-zinc-400 mb-4">
              Subscribe to the Pro tier for 2,000 monthly credits and priority access to GPT-4o and Gemini 1.5 Pro.
            </p>
            <Link href="/dashboard/billing">
              <Button variant="outline" className="w-full text-xs border-zinc-700">
                Manage Subscription
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
