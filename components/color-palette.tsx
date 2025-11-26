"use client";

import { motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";
import { TColorChip } from "@/lib/types/colorChip";
import ColorLockButton from "./color-lock-button";

type ColorPaletteProps = {
  colors: TColorChip[];
  colorsLength: number;
  isNewChip: (index: number, color: TColorChip) => boolean;
  addColorChip: () => void;
  removeColorChip: (indexToRemove: number) => void;
  toggleLock: (index: number) => void;
  copyHexCode: (hexCode: string) => Promise<void>;
};

export default function ColorPalette({
  colors,
  colorsLength,
  isNewChip,
  addColorChip,
  removeColorChip,
  toggleLock,
  copyHexCode,
}: ColorPaletteProps) {
  return (
    // Mobile: wrap (2 rows), centered; Desktop: no wrap, single row, align-start
    <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-4 md:gap-8">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          initial={isNewChip(index, color) ? { opacity: 0, scale: 0.5 } : {}}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col items-center space-y-5"
        >
          <ColorLockButton
            index={index}
            locked={color.locked}
            toggleLock={toggleLock}
          />

          <ColorChip
            color={color}
            colorsLength={colorsLength}
            onRemove={() => removeColorChip(index)}
            copyHexCode={copyHexCode}
          />
        </motion.div>
      ))}

      {/* Plus button acts as another chip and will be laid out inline with the colors */}
      {colors.length < 5 && (
        <div className="flex flex-col items-center space-y-5">
          <div className="h-5 md:h-6" />
          <PlusButton onClick={addColorChip} />
        </div>
      )}
    </div>
  );
}
