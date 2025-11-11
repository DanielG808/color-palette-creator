import { TColorChip } from "@/lib/types/colorChip";

type ColorChipSmProps = {
  color: TColorChip;
};

export default function ColorChipSm({ color }: ColorChipSmProps) {
  return (
    <li
      className="h-7 w-7 rounded-full"
      style={{ backgroundColor: color.hexCode }}
    />
  );
}
