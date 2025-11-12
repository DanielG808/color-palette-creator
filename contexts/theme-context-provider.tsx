"use client";

import { createContext, useEffect, useMemo, useState, ReactNode } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setThemeDirect: (t: Theme) => void;
  initialized: boolean;
};

const STORAGE_KEY = "theme";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);

  const applyHtml = (t: Theme) => {
    const html = document.documentElement;
    html.classList.toggle("dark", t === "dark");
    html.setAttribute("data-theme", t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initial: Theme = saved === "dark" ? "dark" : "light";
      setTheme(initial);
      applyHtml(initial);
    } catch {
      setTheme("light");
      applyHtml("light");
    }
  }, []);

  const toggleTheme = () => {
    if (!theme) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyHtml(next);
  };

  const setThemeDirect = (t: Theme) => {
    setTheme(t);
    applyHtml(t);
  };

  const value = useMemo(
    () => ({
      theme: (theme ?? "light") as Theme,
      toggleTheme,
      setThemeDirect,
      initialized: theme !== null,
    }),
    [theme]
  );

  if (theme === null) return null;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
