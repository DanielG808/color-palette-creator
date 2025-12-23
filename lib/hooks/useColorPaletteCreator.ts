// lib/hooks/useColorPaletteCreator.ts
import { useState, useRef, useEffect } from "react";
import { TColorChip } from "../types/colorChip";
import { generateHexCode } from "../utils/generateHexCode";
import { toast } from "sonner";
import { TPalette } from "../types/palette";

export default function useColorPaletteCreator() {
  // state
  const [colors, setColors] = useState<TColorChip[]>([]);
  const [palettes, setPalettes] = useState<TPalette[]>([]);
  const [exporting, setExporting] = useState(false);

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

  function savePalette() {
    try {
      const storedPalettes = localStorage.getItem("palettes");
      const palettes: TPalette[] = storedPalettes
        ? JSON.parse(storedPalettes)
        : [];

      const lockedColors = colors.map((color) => ({ ...color, locked: true }));

      const newPaletteHexCodes = lockedColors
        .map((color) => color.hexCode.toLowerCase())
        .sort();

      const isDuplicate = palettes.some((palette) => {
        const existingHexCodes = palette.colors
          .map((color) => color.hexCode.toLowerCase())
          .sort();
        return (
          existingHexCodes.length === newPaletteHexCodes.length &&
          existingHexCodes.every((hex, i) => hex === newPaletteHexCodes[i])
        );
      });

      if (isDuplicate) {
        toast.warning("This palette already exists.");
        return;
      }

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

  function loadPalette(id: string) {
    try {
      const palette = palettes.find((palette) => palette.id === id);
      if (!palette) {
        console.warn(`No palette found with id ${id}`);
        toast.warning("Palette not found.");
        return;
      }

      setColors(palette.colors);
    } catch (error) {
      console.warn("Failed to load palette:", error);
      toast.warning("Failed to load palette to the canvas.");
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

  async function exportPalette(opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) {
    if (exporting) return;

    setExporting(true);

    try {
      const type = opts?.type ?? "png";
      const mime = type === "jpeg" ? "image/jpeg" : "image/png";
      const quality = opts?.quality ?? 0.92;

      const swatches = colors.map((c) => c.hexCode);

      const scale = 2;
      const padding = 32;
      const gap = 20;
      const swatchW = 240;
      const swatchH = 180;
      const radius = 22;

      const width =
        padding * 2 + swatches.length * swatchW + (swatches.length - 1) * gap;

      const height = padding * 2 + swatchH + 54;

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast.error("Export failed.");
        return;
      }

      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      if (type === "jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      }

      const roundRect = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number
      ) => {
        const rr = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rr, y);
        ctx.arcTo(x + w, y, x + w, y + h, rr);
        ctx.arcTo(x + w, y + h, x, y + h, rr);
        ctx.arcTo(x, y + h, x, y, rr);
        ctx.arcTo(x, y, x + w, y, rr);
        ctx.closePath();
      };

      swatches.forEach((hex, i) => {
        const x = padding + i * (swatchW + gap);
        const y = padding;

        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.18)";
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 6;

        roundRect(x, y, swatchW, swatchH, radius);
        ctx.fillStyle = hex;
        ctx.fill();
        ctx.restore();

        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0,0,0,0.08)";
        roundRect(x, y, swatchW, swatchH, radius);
        ctx.stroke();

        const labelY = y + swatchH + 28;
        const labelText = hex.toUpperCase();

        ctx.font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
        const textW = ctx.measureText(labelText).width;
        const pillW = textW + 22;
        const pillH = 26;
        const pillX = x + swatchW / 2 - pillW / 2;
        const pillY = labelY - pillH / 2;

        ctx.fillStyle = "rgba(255,255,255,0.75)";
        roundRect(pillX, pillY, pillW, pillH, 13);
        ctx.fill();

        ctx.fillStyle = "#1f2933";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(labelText, x + swatchW / 2, labelY);
      });

      await new Promise<void>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve();

            const timestamp = new Date()
              .toISOString()
              .replace(/[:.]/g, "-")
              .slice(0, 19);

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `palette-${timestamp}.${type}`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            resolve();
          },
          mime,
          quality
        );
      });

      toast.success("Palette exported!");
    } catch (error) {
      console.warn("Export failed:", error);
      toast.error("Export failed.");
    } finally {
      setExporting(false);
    }
  }

  return {
    colors,
    colorsLength,
    palettes,
    exporting,
    exportPalette,
    isNewChip,
    addColorChip,
    removeColorChip,
    toggleLock,
    copyHexCode,
    isAllLocked,
    randomizeColors,
    savePalette,
    loadPalette,
    deletePalette,
  };
}
