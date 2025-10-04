"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  function handleToggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className={cn(
        "relative h-7 w-7 pb-1 cursor-pointer bg-background dark:bg-background z-[9999]",
        className,
      )}
      onClick={handleToggle}
    >
      <Sun
        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        aria-hidden="true"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        aria-hidden="true"
      />
      <span className="sr-only">
        {isDark ? "Trocar para modo claro" : "Trocar para modo escuro"}
      </span>
    </Button>
  );
}
