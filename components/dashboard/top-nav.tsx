"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { Bell, Menu, LogOut, Settings } from "lucide-react";
import { ThemeSelector } from "@/components/theme-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface TopNavProps {
  user: User;
  onMenuClick: () => void;
}

export function TopNav({ user, onMenuClick }: TopNavProps) {
  const userRole = user.user_metadata?.role || "student";
  const router = useRouter();
  const supabase = createClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutPopoverOpen, setIsLogoutPopoverOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const handlePopoverOpenChange = (open: boolean) => {
    setIsLogoutPopoverOpen(open);
    if (open) {
      setTimeout(() => {
        setIsLogoutPopoverOpen(false);
      }, 7000);
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
        {/* Left Side: Mobile Menu Button & Desktop Nav */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard" className="rounded-md px-3 py-1.5 text-sm font-medium text-primary hover:bg-hover">Dashboard</Link>
            <Link href="#" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground">Users</Link>
            <Link href="#" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground">Clubs</Link>
            <Link href="#" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground">Events</Link>
            <Link href="#" className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-hover hover:text-foreground">Analytics</Link>
          </nav>
        </div>

        {/* Right Side: Icons & User Menu */}
        <div className="flex items-center gap-4">
          <ThemeSelector />
          <Button variant="ghost" size="icon" className="relative rounded-full">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 rounded-full border-none hover:bg-transparent">
                <img src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.email}`} alt="User avatar" className="h-8 w-8 rounded-full" />
                <div className="hidden text-left md:block">
                  <div className="text-sm font-medium">{user.email}</div>
                  <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">{userRole}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="focus:bg-hover">
                <Link href="/profile">
                  <Settings className="w-5 h-5 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <Popover open={isLogoutPopoverOpen} onOpenChange={handlePopoverOpenChange}>
                <PopoverTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-destructive focus:bg-hover focus:text-destructive"
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Confirm Logout</h4>
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to log out?
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsLogoutPopoverOpen(false)}>Cancel</Button>
                      <Button variant="destructive" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
