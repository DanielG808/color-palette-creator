import { TPalette } from "@/lib/types/palette";
import PaletteChip from "./palette-chip";

type PaletteListProps = {
  palettes: TPalette[];
};

export default function PaletteList({ palettes }: PaletteListProps) {
  return (
    <ul>
      {palettes.map((palette) => (
        <PaletteChip key={palette.id} palette={palette} />
      ))}
    </ul>
  );
}
