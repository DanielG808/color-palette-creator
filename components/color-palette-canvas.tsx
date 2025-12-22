"use client";

import { TColorChip } from "@/lib/types/colorChip";

import H1 from "./H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";
import SavePaletteButton from "./save-palette-button";
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

  // ✅ required for export
  exportPalette: (opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) => Promise<void> | void;
  exporting: boolean;
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
  exportPalette,
  exporting,
}: ColorPaletteCanvasProps) {
  const allLocked = isAllLocked();

  return (
    <section className="flex-1 flex flex-col border border-calm-3/75 dark:border-white/35 h-[410px] px-5 md:px-10 py-5 rounded-md">
      <div className="flex justify-between items-start">
        <H1 className="mb-5 md:mb-10">Create your palette:</H1>
        <ExportPaletteButton
          exportPalette={exportPalette}
          loading={exporting}
        />
      </div>

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
