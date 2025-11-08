"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, LogIn, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeSelector } from "@/components/theme-selector";
import { LogoutModal } from "@/components/logout-modal";

export function AuthButtonClient() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = createClient().auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setShowLogoutModal(false);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-20 h-8 bg-gray-600 animate-pulse rounded"></div>
        <div className="w-20 h-8 bg-gray-600 animate-pulse rounded"></div>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <ThemeSelector />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard" className="text-gray-300 hover:text-white">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLogoutModal(true)}
            className="text-gray-300 border-gray-600 hover:text-white hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <LogoutModal
          open={showLogoutModal}
          onOpenChange={setShowLogoutModal}
          onConfirm={handleLogout}
          isLoading={isLoggingOut}
        />
      </>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <ThemeSelector />
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