"use client";

import SavedPalettesContainer from "./saved-palettes-container";
import ColorPaletteCanvas from "./color-palette-canvas";
import useColorPaletteCreator from "@/lib/hooks/useColorPaletteCreator";

export default function ColorPaletteCreator() {
  const {
    colors,
    colorsLength,
    palettes,
    isNewChip,
    addColorChip,
    removeColorChip,
    toggleLock,
    copyHexCode,
    isAllLocked,
    randomizeColors,
    savePalette,
    loadPalette,
    deletePalette,
    exportPalette,
    exporting,
  } = useColorPaletteCreator();

  return (
    <section
      className="
        grid grid-cols-1 gap-6
        md:grid-cols-[1fr_280px]
        md:h-[410px]            /* ✅ shared height */
        items-stretch
      "
    >
      <ColorPaletteCanvas
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
        toggleLock={toggleLock}
        copyHexCode={copyHexCode}
        isAllLocked={isAllLocked}
        randomizeColors={randomizeColors}
        savePalette={savePalette}
        exportPalette={exportPalette}
        exporting={exporting}
      />

      <SavedPalettesContainer
        palettes={palettes}
        loadPalette={loadPalette}
        deletePalette={deletePalette}
      />
    </section>
  );
}
