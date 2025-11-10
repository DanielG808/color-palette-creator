"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ColorChip from "./color-chip";
import PlusButton from "./plus-button";

export default function ColorPalette() {
  const [numColors, setNumColors] = useState(3);
  const prevNumRef = useRef(numColors);

  function addColorChip() {
    if (numColors >= 5) return;
    setNumColors(numColors + 1);
  }

  const isNewChip = (index: number) => index >= prevNumRef.current;

  useEffect(() => {
    prevNumRef.current = numColors;
  }, [numColors]);

  return (
    <div className="flex space-x-8">
      {Array.from({ length: numColors }).map((_, index) => (
        <motion.div
          key={index}
          initial={isNewChip(index) ? { opacity: 1, scale: 0.5 } : false}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <ColorChip numColors={numColors} />
        </motion.div>
      ))}
      {numColors < 5 && <PlusButton onClick={addColorChip} />}
    </div>
  );
}
