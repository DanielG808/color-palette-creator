"use client";

import H1 from "@/components/H1";
import ColorPalette from "./color-palette";
import { generateHexCode } from "@/lib/utils/generateHexCode";
import { useState, useRef, useEffect } from "react";
import RandomizeColorsButton from "./randomize-colors-button";
import { TColorChip } from "@/lib/types/colorChip";

export default function ColorPaletteCanvas() {
  const [colors, setColors] = useState<TColorChip[]>([]);
  const initializedRef = useRef(false);
  const prevColorsRef = useRef<TColorChip[]>([]);
  const colorsLength = colors.length;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    setColors(
      Array.from({ length: 3 }, () => ({
        hexCode: generateHexCode(),
        locked: false,
      }))
    );
  }, []);

  useEffect(() => {
    prevColorsRef.current = colors;
  }, [colors]);

  function addColorChip() {
    setColors((prev) => {
      if (prev.length >= 5) return prev;
      return [...prev, { hexCode: generateHexCode(), locked: false }];
    });
  }

  function removeColorChip(indexToRemove: number) {
    setColors((prev) => {
      if (prev.length <= 3) return prev;
      return prev.filter((_, index) => index !== indexToRemove);
    });
  }

  function toggleLock(index: number) {
    setColors((prev) =>
      prev.map((chip, i) =>
        i === index ? { ...chip, locked: !chip.locked } : chip
      )
    );
  }

  function randomizeColors() {
    setColors((prev) =>
      prev.map((chip) =>
        chip.locked ? chip : { ...chip, hexCode: generateHexCode() }
      )
    );
  }

  const isNewChip = (index: number, color: TColorChip) =>
    prevColorsRef.current[index]?.hexCode !== color.hexCode;

  return (
    <section className="flex flex-col justify-center border border-calm-3/75 px-10 py-5 rounded-md">
      <H1 className="text-xl mb-10">Create your palette:</H1>
      <ColorPalette
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
        toggleLock={toggleLock}
      />
      <RandomizeColorsButton onClick={randomizeColors} />
    </section>
  );
}
