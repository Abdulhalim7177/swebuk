"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogIn } from "lucide-react";

export function AuthButtonClient() {
  // This is a simplified client version for the navigation
  // We'll redirect to the actual auth pages for authentication
  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/auth/login" className="text-gray-300 hover:text-white">
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/sign-up" className="bg-indigo-600 hover:bg-indigo-700">
          <User className="w-4 h-4 mr-2" />
          Get Started
        </Link>
      </Button>
    </div>
  );
}