"use client";

import { useTheme } from "next-themes";

export function useThemeContext() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return { theme, setTheme, resolvedTheme };
}
