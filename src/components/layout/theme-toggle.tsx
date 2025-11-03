"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="bg-transparent"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-amber-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0L17.95 7.05M7.05 16.95l-1.414 1.414M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5 text-sky-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z"
      />
    </svg>
  );
}
