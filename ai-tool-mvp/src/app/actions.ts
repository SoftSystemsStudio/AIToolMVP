"use server";

import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import OpenAI from "openai";

const XANO_BASE_URL = process.env.XANO_API_BASE_URL!;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Server Action to generate content with OpenAI
 */
export async function generateContent(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return {
      success: true,
      content: completion.choices[0]?.message?.content || "",
    };
  } catch (error) {
    console.error("Error generating content:", error);
    return { success: false, content: "", error: "Failed to generate content" };
  }
}

/**
 * Server Action to save generated content to Xano
 */
export async function saveGeneratedContent(prompt: string, content: string) {
  try {
    const session = await auth();
    const token = await session.getToken({ template: "xano" });

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const res = await axios({
      url: `${XANO_BASE_URL}/generated_content`,
      method: "POST",
      headers,
      data: { prompt, content },
    });

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error saving to Xano:", error);
    return { success: false, error: "Failed to save content" };
  }
}
