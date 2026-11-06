import { Bot, CreditCard, Database, Zap, Lock, Gauge, Code2, LayoutDashboard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: Bot,
    title: "Multi-LLM Streaming Engine",
    badge: "Gemini 2.0 & GPT-4o",
    description: "Plug-and-play streaming completions using Google GenAI SDK and OpenAI SDK with seamless credit deduction.",
  },
  {
    icon: CreditCard,
    title: "Turnkey Stripe Billing",
    badge: "Subscriptions & One-Time",
    description: "Pre-wired checkout sessions, automatic recurring renewals, customer billing portal, and verified webhook listeners.",
  },
  {
    icon: Database,
    title: "Supabase PostgreSQL & Auth",
    badge: "Row Level Security",
    description: "OAuth (Google/GitHub) + Magic link authentication with automated database triggers awarding 50 free credits on sign up.",
  },
  {
    icon: Lock,
    title: "Enterprise Row Level Security (RLS)",
    badge: "Production Safe",
    description: "Strict PostgreSQL security policies ensuring users can only read and mutate their own logs, credits, and subscriptions.",
  },
  {
    icon: LayoutDashboard,
    title: "Complete Member Dashboard",
    badge: "Responsive UI",
    description: "Modern dark-themed member portal with live credit balance, real-time AI generator interface, and subscription manager.",
  },
  {
    icon: Gauge,
    title: "Lighthouse 100/100 Optimized",
    badge: "Next.js 15 App Router",
    description: "Server Components, React 19 compiler optimizations, edge-ready middleware, and zero-bloat Tailwind CSS.",
  },
  {
    icon: Code2,
    title: "100% Clean TypeScript",
    badge: "Zero Any Types",
    description: "Full end-to-end type safety across database schemas, Stripe payloads, user profiles, and AI generation parameters.",
  },
  {
    icon: Zap,
    title: "1-Click Vercel Deployment",
    badge: "Deploy in 5 Mins",
    description: "Pre-configured environment templates and build scripts so you can push to GitHub and deploy to Vercel instantly.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 border-t border-zinc-800/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 text-indigo-400 border-indigo-500/20 bg-indigo-500/10">
            Engineered For Speed
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Everything you need to launch a profitable AI SaaS
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Skip the 200 hours of boring setup. Focus 100% on your unique AI model, prompt engineering, and marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="border-zinc-800/80 bg-zinc-900/40 hover:border-indigo-500/40 hover:bg-zinc-900/70 transition-all duration-200">
                <CardHeader className="p-5">
                  <div className="w-10 h-10 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="secondary" className="w-fit text-[11px] mb-2 font-mono">
                    {feature.badge}
                  </Badge>
                  <CardTitle className="text-lg font-semibold text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0">
                  <CardDescription className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
