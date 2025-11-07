import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateContent(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a content generation assistant that writes concise, high-quality text.",
        },
        { role: "user", content: prompt },
      ],
    });

    return completion.choices[0].message?.content || "No content generated.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to generate content.");
  }
}
