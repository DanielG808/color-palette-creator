import { ThemeContext } from "@/contexts/theme-context-provider";
import { useContext } from "react";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "useThemeContext must be used within ThemeContextProvider."
    );
  return context;
}
