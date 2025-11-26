"use client";

import { TColorChip } from "@/lib/types/colorChip";
// components
import H1 from "./H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";
import SavePaletteButton from "./save-palette-button";

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
  return (
    <section className="flex-1 flex flex-col border border-calm-3/75 dark:border-white/35 h-[410px] px-5 md:px-10 py-5 rounded-md">
      <H1 className="text-lg md:text-xl mb-5 md:mb-10">Create your palette:</H1>
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
