import { TPalette } from "@/lib/types/palette";
import ColorChipSm from "./color-chip-sm";

type PaletteChipProps = {
  palette: TPalette;
};

export default function PaletteColors({ palette }: PaletteChipProps) {
  const { id, colors } = palette;
  return (
    <li>
      <ul className="flex space-x-1">
        {colors.map((color) => (
          <ColorChipSm key={color.hexCode} color={color} />
        ))}
      </ul>
    </li>
  );
}
