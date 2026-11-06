"use client";

import { useState } from "react";
import { Sparkles, Send, Bot, Copy, Check, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AIGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<"gemini-2.0-flash" | "gpt-4o-mini">("gemini-2.0-flash");
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isStreaming) return;

    setIsStreaming(true);
    setOutput("");
    setError(null);

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate AI response.");
      }

      if (!response.body) {
        throw new Error("No response body stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setOutput((prev) => prev + chunk);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during generation.");
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Bot className="w-8 h-8 text-indigo-400" />
          Interactive AI Generator
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Stream real-time completions directly from Google Gemini 2.0 Flash or OpenAI GPT-4o-mini with automated credit deduction.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Model Selection & Prompt Input */}
      <Card className="border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-semibold text-zinc-400">Target Model:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setModel("gemini-2.0-flash")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  model === "gemini-2.0-flash"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Gemini 2.0 Flash (Fast)
              </button>
              <button
                type="button"
                onClick={() => setModel("gpt-4o-mini")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  model === "gpt-4o-mini"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                GPT-4o Mini
              </button>
            </div>
          </div>
          <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs">
            Cost: 1 Credit / Request
          </Badge>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-2">Prompt</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Write a launch announcement on Twitter/X for an AI Micro-SaaS boilerplate built with Next.js 15 and Supabase..."
              className="w-full bg-zinc-950/80 border border-zinc-800 rounded-xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isStreaming || !prompt.trim()}
              className="shadow-lg shadow-indigo-600/25 px-6"
            >
              {isStreaming ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Streaming Output...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Generate Response
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      {/* Streaming Output Panel */}
      <Card className="border-zinc-800 bg-zinc-900/60 p-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-semibold text-white">AI Stream Output</h3>
            {isStreaming && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            )}
          </div>
          {output && (
            <Button variant="ghost" size="sm" onClick={handleCopy} className="text-xs text-zinc-400 hover:text-white">
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy Output
                </>
              )}
            </Button>
          )}
        </div>

        <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-xl p-5 min-h-[160px] text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
          {output || (
            <span className="text-zinc-600 italic">
              Ready to generate. Enter a prompt above and click "Generate Response".
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
