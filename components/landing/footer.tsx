import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">ApexSaaS AI</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400">
            <Link href="#features" className="hover:text-white transition">Features</Link>
            <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition">FAQ</Link>
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <a href="https://samabdus.gumroad.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Gumroad Store</a>
          </div>

          <p className="text-xs text-zinc-500">
            © {new Date().getFullYear()} ApexSaaS AI. Crafted for ambitious founders.
          </p>
        </div>
      </div>
    </footer>
  );
}
