"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Why use ApexSaaS AI instead of building from scratch?",
    a: "Building a SaaS boilerplate from scratch takes between 150 to 200 hours: configuring Next.js 15 App Router, Supabase auth cookies, Row-Level Security, Stripe checkout sessions, listening to webhook failures, and streaming tokens from Google Gemini or OpenAI. ApexSaaS AI handles all the plumbing so you can launch in hours instead of months.",
  },
  {
    q: "How does the AI credit system work?",
    a: "When a user signs up via Supabase, an automatic PostgreSQL database trigger awards them 50 complimentary credits in `profiles.credits_balance`. Every time they send a prompt to the `/api/ai/generate` endpoint, the server verifies they have positive credits, deducts 1 credit, logs the prompt and model used to `ai_generations`, and streams the response token-by-token.",
  },
  {
    q: "Can I use Google Gemini and OpenAI together?",
    a: "Yes! The boilerplate includes pre-configured streaming clients for both Google's `@google/genai` (Gemini 2.0 Flash / Gemini 1.5 Pro) and the official `openai` SDK (GPT-4o / GPT-4o-mini). You can choose which model powers each feature or let your users pick from a dropdown.",
  },
  {
    q: "How does Stripe billing sync with the database?",
    a: "The API endpoint `/api/stripe/webhook` listens to verified Stripe webhooks (`checkout.session.completed`, `customer.subscription.updated`, and `customer.subscription.deleted`). When a customer pays, it updates the `subscriptions` table and immediately replenishes their monthly credit allocation (e.g. 500 or 2,000 credits).",
  },
  {
    q: "What is the difference between Starter ($79) and Unlimited Pro ($149)?",
    a: "The Starter license lets you build and monetize 1 commercial AI SaaS application. The Unlimited Pro license grants you lifetime rights to build unlimited commercial SaaS apps for yourself or for your client work as an agency.",
  },
  {
    q: "Can I deploy this to Vercel?",
    a: "Absolutely. The repository is 100% Vercel ready. Simply clone the repository, link your GitHub repository to Vercel, copy your environment variables from `.env.example`, and your live SaaS is deployed worldwide.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 border-t border-zinc-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-zinc-400">
            Everything you need to know about the architecture, licenses, and AI integrations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-zinc-800/80 rounded-xl bg-zinc-900/40 overflow-hidden transition"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-zinc-800/30 transition"
              >
                <span className="font-medium text-white text-base sm:text-lg">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-200 shrink-0 ${
                    openIndex === idx ? "rotate-180 text-indigo-400" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-400 leading-relaxed border-t border-zinc-800/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
