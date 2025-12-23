"use client";

import { DownloadIcon } from "lucide-react";

type ExportPaletteButtonProps = {
  exportPalette: (opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) => Promise<void> | void;
  loading?: boolean;
};

export default function ExportPaletteButton({
  exportPalette,
  loading,
}: ExportPaletteButtonProps) {
  const handleClick = () => {
    if (loading) return;

    if (typeof exportPalette !== "function") {
      console.error(
        "ExportPaletteButton: exportPalette prop is not a function",
        exportPalette
      );
      return;
    }

    exportPalette({ type: "png" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-label={loading ? "Exporting palette" : "Export palette"}
      className={`
        inline-flex items-center justify-center
        rounded-md border duration-200
        ${loading ? "cursor-wait" : "cursor-pointer"}
        ${
          loading
            ? "bg-gray-300 text-gray-700 dark:bg-white/20 dark:text-white/60"
            : "bg-white text-black border-gray-300 hover:bg-gray-100 dark:bg-white/5 dark:text-white/80 dark:border-white/20 dark:hover:bg-white/10"
        }

        /* ✅ 320px: icon button */
        h-9 w-9 px-0 text-xs

        /* ✅ 480px+: full label button */
        min-[480px]:h-auto min-[480px]:w-auto min-[480px]:px-3 min-[480px]:py-2
      `}
    >
      <span className="min-[480px]:hidden">
        <DownloadIcon className="h-4 w-4" />
      </span>
      <span className="hidden min-[480px]:inline">
        {loading ? "Exporting..." : "Export Palette"}
      </span>
    </button>
  );
}
