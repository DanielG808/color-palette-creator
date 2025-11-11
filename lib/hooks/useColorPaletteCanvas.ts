import { useState, useRef, useEffect } from "react";
import { TColorChip } from "../types/colorChip";
import { generateHexCode } from "../utils/generateHexCode";
import { toast } from "sonner";

export default function useColorPaletteCanvas() {
  // state
  const [colors, setColors] = useState<TColorChip[]>([]);

  // derived state
  const colorsLength = colors.length;

  // refs
  const initializedRef = useRef(false);
  const prevColorsRef = useRef<TColorChip[]>([]);

  const isNewChip = (index: number, color: TColorChip) =>
    prevColorsRef.current[index]?.hexCode !== color.hexCode;

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

  // helpers
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

  async function copyHexCode(hexCode: string) {
    try {
      await navigator.clipboard.writeText(hexCode);
      toast.success(`Copied ${hexCode} to the clipboard!`);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error("Failed to copy to the clipboard.");
    }
  }

  function isAllLocked(): boolean {
    return colors.every((chip) => chip.locked);
  }

  function randomizeColors() {
    if (isAllLocked()) return;

    setColors((prev) =>
      prev.map((chip) =>
        chip.locked ? chip : { ...chip, hexCode: generateHexCode() }
      )
    );
  }

  return {
    colors,
    colorsLength,
    isNewChip,
    addColorChip,
    removeColorChip,
    toggleLock,
    copyHexCode,
    isAllLocked,
    randomizeColors,
  };
}
