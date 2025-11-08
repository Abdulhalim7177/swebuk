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
  Menu,
  X
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeSelector } from "@/components/theme-selector";
import { LogoutModal } from "@/components/logout-modal";

interface MobileDashboardNavProps {
  user: User;
}

export function MobileDashboardNav({ user }: MobileDashboardNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-card shadow-md"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div className="fixed left-0 top-0 w-64 h-full bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <Link href="/dashboard" className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-lg font-bold text-foreground">SWEBUK</h1>
                      <p className="text-xs text-muted-foreground capitalize">{userRole} Dashboard</p>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
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
                      onClick={() => setIsOpen(false)}
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
              <div className="p-4 border-t border-border">
                <div className="space-y-3">
                  <div className="px-3 py-2 text-sm">
                    <p className="font-medium text-foreground truncate">
                      {user.email}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {userRole}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href="/profile" onClick={() => setIsOpen(false)}>
                        <Settings className="w-4 h-4 mr-2" />
                        Profile Settings
                      </Link>
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}