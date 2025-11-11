import { TPalette } from "@/lib/types/palette";
import PaletteChip from "./palette-chip";
import DeletePaletteButton from "./delete-palette-button";

type PaletteListProps = {
  palettes: TPalette[];
};

export default function PaletteList({ palettes }: PaletteListProps) {
  return (
    <ul className="space-y-1 overflow-y-auto max-h-full pr-4">
      {palettes.map((palette, index) => (
        <div
          className={`${
            index % 2 === 0 ? "bg-calm-2/65" : ""
          } flex justify-between w-full`}
        >
          <PaletteChip key={palette.id} palette={palette} />
          <DeletePaletteButton />
        </div>
      ))}
    </ul>
  );
}
