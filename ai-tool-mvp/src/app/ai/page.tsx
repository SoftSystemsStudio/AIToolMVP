import AIPromptForm from "@/components/AIPromptForm";

export default function AIPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Content Generator</h1>
      <AIPromptForm />
    </div>
  );
}
