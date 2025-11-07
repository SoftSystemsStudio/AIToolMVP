"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        Creator AI Tool
      </Link>

      <div className="flex items-center gap-4">
        <SignedOut>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
        </SignedOut>
        <SignedIn>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
