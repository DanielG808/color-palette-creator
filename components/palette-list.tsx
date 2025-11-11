import { TPalette } from "@/lib/types/palette";
import PaletteChip from "./palette-chip";

type PaletteListProps = {
  palettes: TPalette[];
};

export default function PaletteList({ palettes }: PaletteListProps) {
  return (
    <ul className="space-y-1">
      {palettes.map((palette, index) => (
        <PaletteChip
          key={palette.id}
          palette={palette}
          className={index % 2 === 0 ? "bg-calm-2/65" : ""}
        />
      ))}
    </ul>
  );
}
