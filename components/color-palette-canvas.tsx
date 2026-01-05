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
    <section className="flex h-full w-full lg:min-w-[800px] min-w-0 flex-col rounded-md border border-calm-3/75 px-5 py-5 dark:border-white/35 md:px-8">
      <div className="mb-5 flex items-start justify-between">
        <H1 className="whitespace-normal">Create your palette:</H1>

        <ExportPaletteButton
          exportPalette={exportPalette}
          loading={exporting}
        />
      </div>

      <div className="flex-1 min-h-0 flex items-center justify-center">
        <ColorPalette
          colors={colors}
          colorsLength={colorsLength}
          isNewChip={isNewChip}
          addColorChip={addColorChip}
          removeColorChip={removeColorChip}
          toggleLock={toggleLock}
          copyHexCode={copyHexCode}
        />
      </div>

      <div className="mt-5">
        <RandomizeColorsButton
          allLocked={allLocked}
          onClick={randomizeColors}
        />
        <SavePaletteButton savePalette={savePalette} />
      </div>
    </section>
  );
}
