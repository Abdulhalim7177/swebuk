"use client";

import { createClient } from "@/lib/supabase/client";
import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { MobileDashboardNav } from "@/components/dashboard/mobile-dashboard-nav";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

interface DashboardWrapperProps {
  children: React.ReactNode;
}

export function DashboardWrapper({ children }: DashboardWrapperProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    // Listen for auth changes
    const { data: { subscription } } = createClient().auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <MobileDashboardNav user={user} />

      {/* Desktop Dashboard Navigation */}
      <DashboardNav user={user} />

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        {children}
      </main>
    </div>
  );
}