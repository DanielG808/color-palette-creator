"use client";

import { motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";
import { LockOpenIcon } from "lucide-react";

type ColorPaletteProps = {
  colors: string[];
  colorsLength: number;
  isNewChip: (index: number, color: string) => boolean;
  addColorChip: () => void;
  removeColorChip: (indexToRemove: number) => void;
};

export default function ColorPalette({
  colors,
  colorsLength,
  isNewChip,
  addColorChip,
  removeColorChip,
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
          <button className="text-calm-4 hover:text-black duration-200 cursor-pointer">
            <LockOpenIcon />
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
