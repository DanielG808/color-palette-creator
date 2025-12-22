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
      onClick={() => onExport({ type: "png" })}
      disabled={loading}
      className={`px-4 py-2 rounded-md transition cursor-pointer text-xs ${
        loading
          ? "bg-gray-400 text-gray-800 cursor-wait"
          : "border bg-white text-black hover:bg-gray-200"
      }`}
    >
      {loading ? "Exporting..." : "Export Palette"}
    </button>
  );
}
