import { TPalette } from "@/lib/types/palette";
import ColorChipSm from "./color-chip-sm";
import { cn } from "@/lib/utils/cn";

type PaletteChipProps = {
  palette: TPalette;
  className: string;
};

export default function PaletteChip({ palette, className }: PaletteChipProps) {
  const { id, colors } = palette;
  return (
    <li
      className={cn(
        "py-1 px-1 rounded-md hover:bg-calm-3/75 cursor-pointer duration-200",
        className
      )}
    >
      <ul className="flex space-x-1">
        {colors.map((color) => (
          <ColorChipSm key={color.hexCode} color={color} />
        ))}
      </ul>
    </li>
  );
}
