import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ApexSaaS AI — The Ultimate Modern AI Micro-SaaS Starter Kit",
  description: "Ship your AI Micro-SaaS in 24 hours. Pre-built with Next.js 15 App Router, Supabase Auth & PostgreSQL, Stripe Checkout & Subscriptions, and Gemini 2.0 / OpenAI streaming.",
  keywords: ["Next.js 15 boilerplate", "AI SaaS starter kit", "Supabase auth", "Stripe subscription", "Gemini 2.0 flash", "OpenAI streaming"],
  authors: [{ name: "ApexSaaS Team" }],
  openGraph: {
    title: "ApexSaaS AI — Ship your AI Micro-SaaS in 24 hours",
    description: "Production-ready Next.js 15 + Supabase + Stripe + Gemini/OpenAI SaaS Boilerplate.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-indigo-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
