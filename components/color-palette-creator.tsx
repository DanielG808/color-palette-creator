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
    <div
      className="
        w-full
        flex justify-center
        px-4 sm:px-6 lg:px-0
        py-6
        overflow-x-hidden lg:overflow-visible
      "
    >
      <section
        className="
          w-full
          max-w-[1240px] xl:max-w-[1360px] 2xl:max-w-[1480px]
          grid grid-cols-1 gap-6 items-stretch
          xl:flex
          xl:h-[430px]
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
    </div>
  );
}
