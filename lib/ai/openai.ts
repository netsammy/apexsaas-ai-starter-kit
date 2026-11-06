import OpenAI from "openai";

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }
  return new OpenAI({ apiKey });
}

export async function streamOpenAIText(prompt: string, modelName: string = "gpt-4o-mini") {
  const openai = getOpenAIClient();

  const stream = await openai.chat.completions.create({
    model: modelName,
    messages: [
      { role: "system", content: "You are an expert AI assistant inside a modern SaaS application. Provide clear, accurate, high-impact responses." },
      { role: "user", content: prompt }
    ],
    stream: true,
  });

  return stream;
}
