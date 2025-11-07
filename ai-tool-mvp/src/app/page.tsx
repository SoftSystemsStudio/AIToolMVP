import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          Automate Your Content Creation
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          AI-powered tool for creators and eCommerce brands.
        </p>
        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow"
        >
          Get Started
        </a>
      </main>
    </div>
  );
}
