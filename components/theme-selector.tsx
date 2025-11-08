"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/theme-context";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <div className="flex items-center space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.value;

        return (
          <Button
            key={themeOption.value}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => setTheme(themeOption.value)}
            className={`
              h-8 w-8 p-0
              ${isActive
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }
            `}
            title={`${themeOption.label} theme`}
          >
            <Icon className="w-4 h-4" />
          </Button>
        );
      })}
    </div>
  );
}