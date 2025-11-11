import { TPalette } from "@/lib/types/palette";

import PaletteChip from "./palette-chip";

type PaletteListProps = {
  palettes: TPalette[];
};

export default function PaletteList({ palettes }: PaletteListProps) {
  return (
    <ul className="space-y-1 overflow-y-auto max-h-full pr-4">
      {palettes.map((palette, index) => (
        <PaletteChip key={palette.id} index={index} palette={palette} />
      ))}
    </ul>
  );
}
