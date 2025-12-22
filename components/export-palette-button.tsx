"use client";

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

    // keeps the console message you’re seeing, but now it’ll only happen if you forget to pass it
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
      className={`
        px-4 py-2 rounded-md text-xs transition
        border duration-200
        ${loading ? "cursor-wait" : "cursor-pointer"}
        ${
          loading
            ? `
              bg-gray-300 text-gray-700
              dark:bg-white/20 dark:text-white/60
            `
            : `
              bg-white text-black border-gray-300
              hover:bg-gray-100
              dark:bg-white/5 dark:text-white/80 dark:border-white/20
              dark:hover:bg-white/10
            `
        }
      `}
    >
      {loading ? "Exporting..." : "Export Palette"}
    </button>
  );
}
