"use client";
import { useState } from "react";
import axios from "axios";

export default function AIPromptForm() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setOutput("");

    try {
      const res = await axios.post("/api/generate", { prompt });
      setOutput(res.data.output);
    } catch (err) {
      console.error(err);
      setOutput("Error generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe what you want to generate (e.g., Instagram caption for new product)"
        className="w-full p-4 border rounded-lg"
        rows={4}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {output && (
        <div className="p-4 bg-gray-100 border rounded">
          <h2 className="font-semibold mb-2">Generated Content:</h2>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
}
