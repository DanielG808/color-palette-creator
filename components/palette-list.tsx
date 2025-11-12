import { TPalette } from "@/lib/types/palette";

import PaletteChip from "./palette-chip";

type PaletteListProps = {
  palettes: TPalette[];
  loadPalette: (id: string) => void;
  deletePalette: (id: string) => void;
};

export default function PaletteList({
  palettes,
  loadPalette,
  deletePalette,
}: PaletteListProps) {
  return (
    <ul className="space-y-1 overflow-y-auto max-h-full">
      {palettes.length === 0 ? (
        <p className="text-calm-3/75">
          Save a palette and see it displayed here...
        </p>
      ) : (
        palettes.map((palette, index) => (
          <PaletteChip
            key={palette.id}
            index={index}
            palette={palette}
            loadPalette={loadPalette}
            deletePalette={deletePalette}
          />
        ))
      )}
    </ul>
  );
}
