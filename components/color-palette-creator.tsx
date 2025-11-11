// components
import SavedPalettesContainer from "./saved-palettes-container";
import ColorPaletteCanvas from "./color-palette-canvas";

export default function ColorPaletteCreator() {
  return (
    <div className="flex gap-6">
      <ColorPaletteCanvas />
      <SavedPalettesContainer />
    </div>
  );
}
