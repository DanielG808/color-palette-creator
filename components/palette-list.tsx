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
    <ul className="overflow-y-auto h-[310px] space-y-1">
      {palettes.length === 0 ? (
        <li className="text-calm-3/75">
          Save a palette and see it displayed here...
        </li>
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
