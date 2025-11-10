"use client";

import { motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";

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
          key={index} // stable key: index (slots are stable)
          initial={isNewChip(index, color) ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
        >
          <ColorChip
            color={color}
            colorsLength={colorsLength}
            onRemove={() => removeColorChip(index)}
          />
        </motion.div>
      ))}

      {colors.length < 5 && <PlusButton onClick={addColorChip} />}
    </div>
  );
}
