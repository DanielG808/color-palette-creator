// components/color-chip.tsx
"use client";

import { TColorChip } from "@/lib/types/colorChip";
import { XIcon } from "lucide-react";

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
          className="absolute top-0 -right-5 sm:-right-6 p-1 text-calm-5/75 dark:text-white/75 hover:text-calm-5 dark:hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 duration-200"
          aria-label="Remove color"
        >
          <XIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}

      <button
        onClick={() => copyHexCode(color.hexCode)}
        className="flex justify-center items-center border border-calm-4/75 rounded-full shadow-lg hover:shadow-2xl dark:shadow-black/50 dark:hover:shadow-black/70 cursor-pointer duration-200 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
        aria-label={`Copy ${color.hexCode}`}
      >
        <div
          className="rounded-full w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 lg:w-20 lg:h-20"
          style={{ backgroundColor: color.hexCode }}
        />
      </button>
    </div>
  );
}
