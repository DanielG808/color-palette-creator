import { TPalette } from "@/lib/types/palette";
import ColorChipSm from "./color-chip-sm";

type PaletteChipProps = {
  palette: TPalette;
};

export default function PaletteChip({ palette }: PaletteChipProps) {
  const { id, colors } = palette;
  return (
    <li>
      <ul>
        {colors.map((color) => (
          <ColorChipSm key={color.hexCode} color={color} />
        ))}
      </ul>
    </li>
  );
}
