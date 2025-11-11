import { TPalette } from "@/lib/types/palette";

type PaletteListProps = {
  palettes: TPalette[];
};

export default function PaletteList({ palettes }: PaletteListProps) {
  console.log("Palettes:", palettes);

  return <div>PaletteList</div>;
}
