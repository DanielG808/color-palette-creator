"use client";

import { TColorChip } from "@/lib/types/colorChip";
import { XIcon } from "lucide-react";
import { toast } from "sonner";

type ColorChipProps = {
  color: TColorChip;
  colorsLength: number;
  onRemove: () => void;
  copyHexCode: (hexCode: string) => Promise<void>;
};

export default function ColorChip({
  color,
  colorsLength,
  onRemove,
  copyHexCode,
}: ColorChipProps) {
  return (
    <div className="group relative inline-block">
      {colorsLength > 3 && (
        <button
          onClick={onRemove}
          className="absolute top-0 -right-6 p-1 text-calm-5/75 dark:text-white/75 hover:text-calm-5 dark:hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
        >
          <XIcon />
        </button>
      )}

      <button
        onClick={() => copyHexCode(color.hexCode)}
        className="flex justify-center items-center border border-calm-4/75 rounded-full w-24 h-24 shadow-lg hover:shadow-2xl dark:shadow-black/50 dark:hover:shadow-black/70 cursor-pointer duration-200"
      >
        <div
          className="rounded-full w-20 h-20"
          style={{ backgroundColor: color.hexCode }}
        />
      </button>
    </div>
  );
}
