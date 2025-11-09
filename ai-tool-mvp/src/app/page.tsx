import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="text-center py-24">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">
          Automate Your Content Creation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AI-powered automation for creators and small e-commerce brands.
        </p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-8 py-3 rounded shadow hover:bg-blue-700"
        >
          Get Started
        </a>
      </main>
    </div>
  );
}
