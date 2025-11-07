"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) router.push("/login");
  }, [isSignedIn, router]);

  if (!isSignedIn) return null;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.firstName || "Creator"}!</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <p className="text-gray-600">This is your AI automation dashboard.</p>
    </div>
  );
}
