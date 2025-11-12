import { Trash2Icon } from "lucide-react";

type DeletePaletteButtonProps = {
  paletteId: string;
  deletePalette: (id: string) => void;
};

export default function DeletePaletteButton({
  paletteId,
  deletePalette,
}: DeletePaletteButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        deletePalette(paletteId);
      }}
      className="m-2 opacity-0 group-hover:opacity-100 text-calm-5 hover:text-black cursor-pointer duration-200"
    >
      <Trash2Icon className="w-5 h-5" />
    </button>
  );
}
