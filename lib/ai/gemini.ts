import { GoogleGenAI } from "@google/genai";

export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
  }
  return new GoogleGenAI({ apiKey });
}

export async function streamGeminiText(prompt: string, modelName: string = "gemini-2.0-flash") {
  const ai = getGeminiClient();

  const responseStream = await ai.models.generateContentStream({
    model: modelName,
    contents: [prompt],
  });

  return responseStream;
}
