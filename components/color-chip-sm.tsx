import { TColorChip } from "@/lib/types/colorChip";

type ColorChipSmProps = {
  color: TColorChip;
};

export default function ColorChipSm({ color }: ColorChipSmProps) {
  return <li>{color.hexCode}</li>;
}
