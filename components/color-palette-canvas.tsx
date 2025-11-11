"use client";

// components
import H1 from "@/components/H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";

// hooks
import useColorPaletteCanvas from "@/lib/hooks/useColorPaletteCanvas";

export default function ColorPaletteCanvas() {
  const {
    colors,
    colorsLength,
    isNewChip,
    addColorChip,
    removeColorChip,
    toggleLock,
    isAllLocked,
    randomizeColors,
  } = useColorPaletteCanvas();

  const allLocked = isAllLocked();

  return (
    <section className="flex flex-col justify-center border border-calm-3/75 px-10 py-5 rounded-md">
      <H1 className="text-xl mb-10">Create your palette:</H1>
      <ColorPalette
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
        toggleLock={toggleLock}
      />
      <RandomizeColorsButton allLocked={allLocked} onClick={randomizeColors} />
    </section>
  );
}
