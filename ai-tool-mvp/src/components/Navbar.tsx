"use client";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Creator AI Tool
      </Link>

      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/ai" className="text-gray-700 hover:text-blue-600">
          AI Prompt
        </Link>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
