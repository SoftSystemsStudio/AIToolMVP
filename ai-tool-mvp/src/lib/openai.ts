import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateContent(prompt: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an AI assistant for social media and e-commerce content creation." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message?.content || "No content generated.";
}
