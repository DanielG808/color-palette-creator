"use client";

import { motion } from "framer-motion";
import { forwardRef } from "react";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";
import ColorLockButton from "./color-lock-button";
import { TColorChip } from "@/lib/types/colorChip";

type ColorPaletteProps = {
  colors: TColorChip[];
  colorsLength: number;
  isNewChip: (index: number, color: TColorChip) => boolean;
  addColorChip: () => void;
  removeColorChip: (indexToRemove: number) => void;
  toggleLock: (index: number) => void;
  copyHexCode: (hexCode: string) => Promise<void>;
};

const ColorPalette = forwardRef<HTMLDivElement, ColorPaletteProps>(
  (
    {
      colors,
      colorsLength,
      isNewChip,
      addColorChip,
      removeColorChip,
      toggleLock,
      copyHexCode,
    },
    ref
  ) => {
    const showPlus = colors.length < 5;

    const items = colors.map((color, index) => (
      <motion.div
        key={`chip-${index}`}
        initial={isNewChip(index, color) ? { opacity: 0, scale: 0.5 } : {}}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="flex flex-col items-center space-y-3"
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
    ));

    if (showPlus) {
      items.push(
        <motion.div
          key="plus"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col items-center space-y-3"
        >
          <div className="h-5" />
          <PlusButton onClick={addColorChip} />
        </motion.div>
      );
    }

    const topRow = items.slice(0, 3);
    const bottomRow = items.slice(3);

    return (
      <div ref={ref} className="w-full">
        {/* TOP ROW — 3 */}
        <div className="flex justify-center gap-4 md:justify-start md:gap-8">
          {topRow}
        </div>

        {/* BOTTOM ROW — 2 CENTERED */}
        {bottomRow.length > 0 && (
          <div className="mt-6 flex justify-center gap-4 md:justify-start md:gap-8">
            {bottomRow}
          </div>
        )}
      </div>
    );
  }
);

ColorPalette.displayName = "ColorPalette";
export default ColorPalette;
