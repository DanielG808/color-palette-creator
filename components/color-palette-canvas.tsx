"use client";

import { TColorChip } from "@/lib/types/colorChip";
import html2canvas from "html2canvas";
// components
import H1 from "./H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";
import SavePaletteButton from "./save-palette-button";
import { useRef, useState } from "react";
import ExportPaletteButton from "./export-palette-button";

type ColorPaletteCanvasProps = {
  colors: TColorChip[];
  colorsLength: number;
  isNewChip: (index: number, color: TColorChip) => boolean;
  addColorChip: () => void;
  removeColorChip: (index: number) => void;
  toggleLock: (index: number) => void;
  copyHexCode: (hexCode: string) => Promise<void>;
  isAllLocked: () => boolean;
  randomizeColors: () => void;
  savePalette: () => void;
};

export default function ColorPaletteCanvas({
  colors,
  colorsLength,
  isNewChip,
  addColorChip,
  removeColorChip,
  toggleLock,
  copyHexCode,
  isAllLocked,
  randomizeColors,
  savePalette,
}: ColorPaletteCanvasProps) {
  const allLocked = isAllLocked();

  // ref to the root palette div inside ColorPalette (forwardRef required)
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState(false);

  const exportPalette = async (opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) => {
    if (!paletteRef.current) return;
    try {
      setExporting(true);

      const canvas = await html2canvas(paletteRef.current, {
        backgroundColor: null, // preserves transparency; set a color if you want a BG
        scale: 2, // increase for higher-res output
        useCORS: true, // helpful if images/fonts are cross-origin and allowed
      });

      const type = opts?.type ?? "png";
      const mime = type === "jpeg" ? "image/jpeg" : "image/png";
      const quality = opts?.quality ?? 0.92;

      const dataUrl = canvas.toDataURL(mime, quality);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `palette.${type}`;
      // Safari on iOS doesn't support link.click() for downloads — this covers most desktop/mobile browsers
      link.click();
    } catch (err) {
      // you can show a toast or console log
      console.error("Export failed", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="flex-1 flex flex-col border border-calm-3/75 dark:border-white/35 h-[410px] px-5 md:px-10 py-5 rounded-md">
      <H1 className="mb-5 md:mb-10">Create your palette:</H1>
      <ExportPaletteButton onExport={exportPalette} loading={exporting} />
      <ColorPalette
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
        toggleLock={toggleLock}
        copyHexCode={copyHexCode}
      />
      <RandomizeColorsButton allLocked={allLocked} onClick={randomizeColors} />
      <SavePaletteButton savePalette={savePalette} />
    </section>
  );
}
