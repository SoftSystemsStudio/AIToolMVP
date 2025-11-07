"use client";
import { useState } from "react";
import { generateContent, saveGeneratedContent } from "@/app/actions";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      // 1️⃣ Generate text with OpenAI (Server Action)
      const result = await generateContent(prompt);
      
      if (!result.success) {
        console.error("Failed to generate content");
        return;
      }

      setOutput(result.content);

      // 2️⃣ Save to Xano using Server Action
      const saveResult = await saveGeneratedContent(prompt, result.content);
      
      if (!saveResult.success) {
        console.error("Failed to save to Xano");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">AI Content Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>
      {output && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-semibold mb-2">Generated Output</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
