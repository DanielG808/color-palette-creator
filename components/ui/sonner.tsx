"use client";

import { useTheme } from "next-themes";
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => {
  const { theme, resolvedTheme } = useTheme();

  // fallback to resolvedTheme in case theme is 'system'
  const activeTheme = theme === "system" ? resolvedTheme : theme;

  if (!activeTheme) return null; // wait until theme is ready

  return (
    <Sonner
      key={activeTheme} // remount on theme change
      theme={activeTheme as ToasterProps["theme"]}
      position="top-right"
      richColors
      icons={{
        success: <CircleCheckIcon className="h-4 w-4" />,
        info: <InfoIcon className="h-4 w-4" />,
        warning: <TriangleAlertIcon className="h-4 w-4" />,
        error: <OctagonXIcon className="h-4 w-4" />,
        loading: <Loader2Icon className="h-4 w-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": activeTheme === "dark" ? "#292929" : "#ffffff",
          "--normal-text": activeTheme === "dark" ? "#f5f5f5" : "#111827",
          "--normal-border": "1px solid var(--border)",
          "--border-radius": "8px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
