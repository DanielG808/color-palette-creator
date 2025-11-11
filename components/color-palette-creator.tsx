"use client";

// components
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
    deletePalette,
  } = useColorPaletteCreator();

  return (
    <div className="flex gap-6">
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
      />
      <SavedPalettesContainer
        palettes={palettes}
        deletePalette={deletePalette}
      />
    </div>
  );
}
