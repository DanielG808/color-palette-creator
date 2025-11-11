"use client";

import { motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";
import { LockIcon, LockOpenIcon } from "lucide-react";
import { TColorChip } from "@/lib/types/colorChip";

type ColorPaletteProps = {
  colors: TColorChip[];
  colorsLength: number;
  isNewChip: (index: number, color: TColorChip) => boolean;
  addColorChip: () => void;
  removeColorChip: (indexToRemove: number) => void;
  toggleLock: (index: number) => void;
};

export default function ColorPalette({
  colors,
  colorsLength,
  isNewChip,
  addColorChip,
  removeColorChip,
  toggleLock,
}: ColorPaletteProps) {
  return (
    <div className="flex space-x-8">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          initial={isNewChip(index, color) ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col items-center space-y-5"
        >
          <button
            onClick={() => toggleLock(index)}
            className="duration-200 cursor-pointer"
          >
            {color.locked ? (
              <LockIcon className="text-calm-5 hover:text-black" />
            ) : (
              <LockOpenIcon className="text-calm-4 hover:text-black " />
            )}
          </button>
          <ColorChip
            color={color}
            colorsLength={colorsLength}
            onRemove={() => removeColorChip(index)}
          />
        </motion.div>
      ))}

      {colors.length < 5 && (
        <div className="flex flex-col items-center space-y-5">
          <div className="h-6" />
          <PlusButton onClick={addColorChip} />
        </div>
      )}
    </div>
  );
}
