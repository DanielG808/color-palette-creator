"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function ToasterWithTheme() {
  const { theme, systemTheme } = useTheme();
  const resolvedTheme: "light" | "dark" =
    theme === "system" ? systemTheme ?? "light" : (theme as "light" | "dark");

  return <Toaster theme={resolvedTheme} />;
}
