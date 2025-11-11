// components
import H1 from "./H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";
import SavePaletteButton from "./save-palette-button";

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
    copyHexCode,
    isAllLocked,
    randomizeColors,
    savePalette,
  } = useColorPaletteCanvas();

  const allLocked = isAllLocked();
  return (
    <section className="flex-1 flex flex-col border border-calm-3/75 px-10 py-5 rounded-md">
      <H1 className="text-xl mb-10">Create your palette:</H1>
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
