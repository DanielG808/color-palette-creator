"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";
import { generateHexCode } from "@/lib/utils/generateHexCode";

export default function ColorPalette() {
  const [colors, setColors] = useState<string[]>([]);
  const prevColorsRef = useRef<string[]>(colors);
  const colorsLength = colors.length;

  useEffect(() => {
    if (colors.length === 0) {
      setColors(Array.from({ length: 3 }, () => generateHexCode()));
    }
  }, []);

  function addColorChip() {
    if (colorsLength >= 5) return;
    setColors([...colors, generateHexCode()]);
  }

  function removeColorChip(indexToRemove: number) {
    if (colorsLength > 3) {
      setColors(colors.filter((_, index) => index !== indexToRemove));
    }
  }

  const isNewChip = (color: string) => !prevColorsRef.current.includes(color);

  useEffect(() => {
    prevColorsRef.current = colors;
  }, [colors]);

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
