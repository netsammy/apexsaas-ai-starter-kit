import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { streamGeminiText } from "@/lib/ai/gemini";
import { streamOpenAIText } from "@/lib/ai/openai";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const { prompt, model = "gemini-2.0-flash" } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // 1. Check user's credit balance
    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("credits_balance")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: "Failed to fetch user profile." }, { status: 500 });
    }

    if (profile.credits_balance < 1) {
      return NextResponse.json({
        error: "Insufficient credits. Please upgrade your plan or purchase more credits.",
        credits_exhausted: true
      }, { status: 402 });
    }

    // 2. Deduct 1 credit immediately
    await admin
      .from("profiles")
      .update({ credits_balance: profile.credits_balance - 1 })
      .eq("id", user.id);

    await admin.from("credit_transactions").insert({
      user_id: user.id,
      amount: -1,
      type: "ai_generation",
      description: `AI Generation using ${model}`
    });

    // 3. Setup Streaming Response
    const encoder = new TextEncoder();
    let fullResponseText = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (model.startsWith("gemini")) {
            const geminiStream = await streamGeminiText(prompt, model);
            for await (const chunk of geminiStream) {
              const text = chunk.text || "";
              fullResponseText += text;
              controller.enqueue(encoder.encode(text));
            }
          } else {
            // OpenAI stream
            const openaiStream = await streamOpenAIText(prompt, model);
            for await (const chunk of openaiStream) {
              const text = chunk.choices[0]?.delta?.content || "";
              fullResponseText += text;
              controller.enqueue(encoder.encode(text));
            }
          }

          // 4. Log completed generation to DB
          await admin.from("ai_generations").insert({
            user_id: user.id,
            prompt: prompt,
            response: fullResponseText,
            model_used: model,
            credits_cost: 1
          });

          controller.close();
        } catch (streamError: any) {
          console.error("AI Stream Error:", streamError);
          controller.error(streamError);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });

  } catch (error: any) {
    console.error("API Error in /api/ai/generate:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
