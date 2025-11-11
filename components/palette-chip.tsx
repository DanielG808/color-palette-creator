import { TPalette } from "@/lib/types/palette";
import PaletteColors from "./palette-colors";
import DeletePaletteButton from "./delete-palette-button";

type PaletteChipProps = {
  index: number;
  palette: TPalette;
};

export default function PaletteChip({ index, palette }: PaletteChipProps) {
  return (
    <div
      key={palette.id}
      className={`${
        index % 2 === 0 ? "bg-calm-2/65" : ""
      }  group flex justify-between items-center w-full py-1 px-1 rounded-md hover:bg-calm-3/75 cursor-pointer duration-200`}
    >
      <PaletteColors palette={palette} />
      <DeletePaletteButton />
    </div>
  );
}
