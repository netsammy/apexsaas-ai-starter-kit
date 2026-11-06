"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Bot, CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import { createBrowserClient } from "@/lib/supabase/client";

export function DashboardNav() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/ai-generator", label: "AI Generator", icon: Bot },
    { href: "/dashboard/billing", label: "Billing & Credits", icon: CreditCard },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800/80 bg-zinc-950 flex flex-col justify-between p-4 min-h-screen">
      <div>
        <Link href="/" className="flex items-center gap-2.5 px-3 py-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-white">ApexSaaS AI</span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-800/80 pt-4">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
