"use client";

import { useEffect, useState } from "react";

interface ContentItem {
  id: number;
  prompt: string;
  result: string;
  created_at: string;
}

export default function DashboardPage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/xano");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContent(data);
      } catch {
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch("/api/xano", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setContent((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Generated Content</h1>
      {content.length === 0 ? (
        <p>No content yet.</p>
      ) : (
        <div className="grid gap-6">
          {content.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">{item.prompt}</h2>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
              <p>{item.result}</p>
              <p className="text-xs text-gray-400 mt-3">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
