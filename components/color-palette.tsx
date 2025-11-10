"use client";

import { AnimatePresence, motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";

type ColorPaletteProps = {
  colors: string[];
  colorsLength: number;
  isNewChip: (color: string) => boolean;
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
      <AnimatePresence>
        {colors.map((color, index) => (
          <motion.div
            key={color}
            initial={isNewChip(color) ? { opacity: 1, scale: 0.5 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, animationDuration: 0.1 }}
            transition={{ duration: 0.2 }}
          >
            <ColorChip
              color={color}
              colorsLength={colorsLength}
              onRemove={() => removeColorChip(index)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      {colors.length < 5 && <PlusButton onClick={addColorChip} />}
    </div>
  );
}
