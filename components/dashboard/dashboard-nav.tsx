"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap,
  Shield,
  Database
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ThemeSelector } from "@/components/theme-selector";
import { LogoutModal } from "@/components/logout-modal";
import { useState } from "react";

interface DashboardNavProps {
  user: User;
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userRole = user.user_metadata?.role || "student";

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setShowLogoutModal(false);
    router.push("/");
  };

  const getNavItems = () => {
    const baseItems = [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
      },
      {
        href: "/clusters",
        label: "Clusters",
        icon: Users,
      },
      {
        href: "/projects",
        label: "Projects",
        icon: FileText,
      },
      {
        href: "/events",
        label: "Events",
        icon: Calendar,
      },
      {
        href: "/blog",
        label: "Blog",
        icon: BookOpen,
      },
    ];

    const roleSpecificItems = [];

    // Add role-specific navigation items
    switch (userRole.toLowerCase()) {
      case "admin":
        roleSpecificItems.push(
          {
            href: "/admin/users",
            label: "User Management",
            icon: Users,
          },
          {
            href: "/admin/settings",
            label: "System Settings",
            icon: Settings,
          },
          {
            href: "/admin/database",
            label: "Database",
            icon: Database,
          }
        );
        break;
      case "staff":
        roleSpecificItems.push(
          {
            href: "/fyp/supervision",
            label: "FYP Supervision",
            icon: GraduationCap,
          },
          {
            href: "/assessment",
            label: "Assessment",
            icon: FileText,
          }
        );
        break;
      case "lead":
        roleSpecificItems.push(
          {
            href: "/clusters/manage",
            label: "Manage Cluster",
            icon: Users,
          },
          {
            href: "/clusters/applications",
            label: "Applications",
            icon: Users,
          }
        );
        break;
      case "deputy":
        roleSpecificItems.push(
          {
            href: "/blog/review",
            label: "Review Blog",
            icon: BookOpen,
          },
          {
            href: "/clusters/applications",
            label: "Applications",
            icon: Users,
          }
        );
        break;
    }

    return [...baseItems, ...roleSpecificItems];
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed left-0 top-0 z-50 w-64 h-screen bg-white border-r border-gray-200 lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SWEBUK</h1>
              <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Button
                key={item.href}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                asChild
              >
                <Link href={item.href}>
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="space-y-3">
            {/* Theme Selector */}
            <div className="px-3 py-2">
              <p className="text-xs font-medium text-gray-700 mb-2">Theme</p>
              <ThemeSelector />
            </div>

            <div className="px-3 py-2 text-sm">
              <p className="font-medium text-gray-900 truncate">
                {user.email}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {userRole}
              </p>
            </div>

            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                <Link href="/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Logout Modal */}
        <LogoutModal
          open={showLogoutModal}
          onOpenChange={setShowLogoutModal}
          onConfirm={handleLogout}
          isLoading={isLoggingOut}
        />
      </div>
    </nav>
  );
}