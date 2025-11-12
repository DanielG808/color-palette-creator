import { motion } from "framer-motion";
import { TPalette } from "@/lib/types/palette";
import PaletteColors from "./palette-colors";
import DeletePaletteButton from "./delete-palette-button";

type PaletteChipProps = {
  index: number;
  palette: TPalette;
  loadPalette: (id: string) => void;
  deletePalette: (id: string) => void;
};

export default function PaletteChip({
  index,
  palette,
  loadPalette,
  deletePalette,
}: PaletteChipProps) {
  return (
    <motion.div
      key={palette.id}
      onClick={() => loadPalette(palette.id)}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.12 }}
      className={`${
        index % 2 === 0 ? "bg-calm-2/65" : ""
      }  group flex justify-between items-center w-full py-1 px-1 rounded-md hover:bg-calm-3/75 cursor-pointer duration-200`}
    >
      <PaletteColors palette={palette} />
      <DeletePaletteButton
        paletteId={palette.id}
        deletePalette={deletePalette}
      />
    </motion.div>
  );
}
