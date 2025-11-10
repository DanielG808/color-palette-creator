"use client";

import H1 from "@/components/H1";
import ColorPalette from "./color-palette";
import { generateHexCode } from "@/lib/utils/generateHexCode";
import { useState, useRef, useEffect } from "react";
import RandomizeColorsButton from "./randomize-colors-button";

export default function ColorPaletteCanvas() {
  const [colors, setColors] = useState<string[]>([]);
  const prevColorsRef = useRef<string[]>(colors);
  const colorsLength = colors.length;

  function initializeColors(numColors: number) {
    if (colors.length === 0) {
      setColors(Array.from({ length: numColors }, () => generateHexCode()));
    }
  }

  useEffect(() => {
    initializeColors(3);
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
    <section className="flex flex-col justify-center border border-calm-3/75 px-10 py-4 rounded-md">
      <H1 className="text-xl mb-10">Create your palette:</H1>
      <ColorPalette
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
      />
      <RandomizeColorsButton />
    </section>
  );
}
