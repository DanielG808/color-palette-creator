import { Trash2Icon } from "lucide-react";

export default function DeletePaletteButton() {
  return (
    <button className="m-2 opacity-0 group-hover:opacity-100 text-calm-5 hover:text-black cursor-pointer duration-200">
      <Trash2Icon className="w-5 h-5" />
    </button>
  );
}
