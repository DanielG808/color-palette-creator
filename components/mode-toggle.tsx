"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      style={{
        width: "3rem",
        aspectRatio: "1 / 1",
        borderRadius: "50%",
        border: "1px solid gray",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        minWidth: "2.5rem",
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
