// components/DarkModeToggle.tsx
"use client";

import { useThemeContext } from "@/lib/hooks/useThemeContext";

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      className="px-3 py-1 rounded border"
    >
      {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
    </button>
  );
}
