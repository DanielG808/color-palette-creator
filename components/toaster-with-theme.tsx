"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterWithTheme() {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme: "light" | "dark" =
    theme === "system" ? systemTheme ?? "light" : (theme as "light" | "dark");

  const isDark = resolvedTheme === "dark";

  return (
    <Toaster
      theme={resolvedTheme}
      style={
        {
          "--normal-bg": isDark ? "var(--popover)" : "white",
          "--normal-text": isDark ? "var(--popover-foreground)" : "black",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
    />
  );
}
