"use client";

import H1 from "@/components/H1";
import ColorPalette from "./color-palette";
import { generateHexCode } from "@/lib/utils/generateHexCode";
import { useState, useRef, useEffect } from "react";
import RandomizeColorsButton from "./randomize-colors-button";

export default function ColorPaletteCanvas() {
  const [colors, setColors] = useState<string[]>([]);
  const initializedRef = useRef(false);
  const prevColorsRef = useRef<string[]>([]);
  const colorsLength = colors.length;

  // Guarded init -> avoids double init in Strict Mode
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setColors(Array.from({ length: 3 }, () => generateHexCode()));
  }, []);

  // keep prevColorsRef for "isNew" comparison by index
  useEffect(() => {
    prevColorsRef.current = colors;
  }, [colors]);

  function addColorChip() {
    setColors((prev) => {
      if (prev.length >= 5) return prev;
      return [...prev, generateHexCode()];
    });
  }

  function removeColorChip(indexToRemove: number) {
    setColors((prev) => {
      if (prev.length <= 3) return prev;
      return prev.filter((_, index) => index !== indexToRemove);
    });
  }

  function randomizeColors() {
    // single functional update that preserves array length & indices
    setColors((prev) => prev.map(() => generateHexCode()));
  }

  // isNewChip -> compare by index (safer when keys are indices)
  const isNewChip = (index: number, color: string) =>
    prevColorsRef.current[index] !== color;

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
      <RandomizeColorsButton onClick={randomizeColors} />
    </section>
  );
}
