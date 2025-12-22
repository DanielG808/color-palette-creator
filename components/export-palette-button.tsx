"use client";

type ExportPaletteButtonProps = {
  onExport: (opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) => Promise<void> | void;
  loading?: boolean;
};

export default function ExportPaletteButton({
  onExport,
  loading,
}: ExportPaletteButtonProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!loading) {
          onExport({ type: "png" });
        }
      }}
      disabled={loading}
      className={`
    px-4 py-2 rounded-md text-xs transition
    border cursor-pointer duration-200
    ${
      loading
        ? `
          bg-gray-300 text-gray-700 cursor-wait
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
