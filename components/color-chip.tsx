import { XIcon } from "lucide-react";

type ColorChipProps = {
  color: string;
  colorsLength: number;
  onRemove: () => void;
};

export default function ColorChip({
  color,
  colorsLength,
  onRemove,
}: ColorChipProps) {
  return (
    <div className="group relative inline-block">
      {colorsLength > 3 && (
        <button
          onClick={onRemove}
          className="absolute top-0 -right-6 p-1 text-calm-5/75 hover:text-calm-5 cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
        >
          <XIcon />
        </button>
      )}

      <div className="flex justify-center items-center border border-calm-4/75 rounded-full w-24 h-24 shadow-lg hover:shadow-2xl duration-200">
        <div
          className="rounded-full w-20 h-20"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
