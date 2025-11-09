import { NextResponse } from "next/server";
import { generateContent } from "@/lib/openai";
import { saveGeneratedContent } from "@/lib/xano";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "No prompt provided." }, { status: 400 });

  const output = await generateContent(prompt);
  await saveGeneratedContent(prompt, output);

  return NextResponse.json({ output });
}
