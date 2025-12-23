// components/color-palette.tsx
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

const LOCK_SLOT = "h-8"; // fixed slot so the chip row always lines up (incl. the +)

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
        className="flex shrink-0 flex-col items-center gap-3"
      >
        {/* lock slot (fixed height) */}
        <div className={`${LOCK_SLOT} flex items-center justify-center`}>
          <ColorLockButton
            index={index}
            locked={color.locked}
            toggleLock={toggleLock}
          />
        </div>

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
          className="flex shrink-0 flex-col items-center gap-3"
        >
          {/* empty lock slot (same height as others) */}
          <div
            className={`${LOCK_SLOT} flex items-center justify-center`}
            aria-hidden="true"
          />

          <PlusButton onClick={addColorChip} />
        </motion.div>
      );
    }

    const topRow = items.slice(0, 3);
    const bottomRow = items.slice(3);

    return (
      <div ref={ref} className="w-full min-w-0">
        {/* ✅ DESKTOP+: single row (center + responsive gap, no edge clipping) */}
        <div className="hidden lg:flex w-full flex-nowrap justify-center gap-6 px-2 xl:gap-8 2xl:gap-10">
          {items}
        </div>

        {/* ✅ BELOW DESKTOP: centered 3 + 2 layout */}
        <div className="lg:hidden">
          <div className="flex justify-center gap-4 md:gap-8">{topRow}</div>

          {bottomRow.length > 0 && (
            <div className="mt-6 flex justify-center gap-4 md:gap-8">
              {bottomRow}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ColorPalette.displayName = "ColorPalette";
export default ColorPalette;
