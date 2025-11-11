import { useState, useRef, useEffect } from "react";
import { TColorChip } from "../types/colorChip";
import { generateHexCode } from "../utils/generateHexCode";
import { toast } from "sonner";
import { TPalette } from "../types/palette";

export default function useColorPaletteCreator() {
  // state
  const [colors, setColors] = useState<TColorChip[]>([]);
  const [palettes, setPalettes] = useState<TPalette[]>([]);

  useEffect(() => {
    setPalettes(getPalettes);
  }, []);

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
  function getPalettes() {
    try {
      const stored = localStorage.getItem("palettes");
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed.slice().reverse();
    } catch (error) {
      toast.warning("Failed to retrieve saved palettes.");
      console.warn("Failed to parse palettes from localStorage:", error);
      return [];
    }
  }

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

  function savePalette() {
    try {
      const storedPalettes = localStorage.getItem("palettes");
      const palettes: TPalette[] = storedPalettes
        ? JSON.parse(storedPalettes)
        : [];

      const lockedColors = colors.map((color) => ({ ...color, locked: true }));

      const newPalette = {
        id: crypto.randomUUID(),
        colors: lockedColors,
      };
      palettes.push(newPalette);

      localStorage.setItem("palettes", JSON.stringify(palettes));
      setPalettes(palettes.slice().reverse());
      toast.success("New palette saved!");
    } catch (error) {
      console.warn("Failed to add palette to localStorage:", error);
      toast.warning("Failed to save palette. Please try again.");
    }
  }

  function deletePalette(id: string) {
    try {
      const newPalettes = palettes.filter((palette) => palette.id !== id);
      localStorage.setItem("palettes", JSON.stringify(newPalettes));
      setPalettes(newPalettes);
      toast.success("Palette successfully deleted.");
    } catch (error) {
      console.warn("Failed to remove palette to localStorage:", error);
      toast.warning("Failed to delete palette. Please try again.");
    }
  }

  return {
    colors,
    colorsLength,
    palettes,
    isNewChip,
    addColorChip,
    removeColorChip,
    toggleLock,
    copyHexCode,
    isAllLocked,
    randomizeColors,
    savePalette,
    deletePalette,
  };
}
