"use client";

import { TColorChip } from "@/lib/types/colorChip";

// components
import H1 from "./H1";
import ColorPalette from "./color-palette";
import RandomizeColorsButton from "./randomize-colors-button";
import SavePaletteButton from "./save-palette-button";
import { useRef, useState } from "react";
import ExportPaletteButton from "./export-palette-button";

type ColorPaletteCanvasProps = {
  colors: TColorChip[];
  colorsLength: number;
  isNewChip: (index: number, color: TColorChip) => boolean;
  addColorChip: () => void;
  removeColorChip: (index: number) => void;
  toggleLock: (index: number) => void;
  copyHexCode: (hexCode: string) => Promise<void>;
  isAllLocked: () => boolean;
  randomizeColors: () => void;
  savePalette: () => void;
};

export default function ColorPaletteCanvas({
  colors,
  colorsLength,
  isNewChip,
  addColorChip,
  removeColorChip,
  toggleLock,
  copyHexCode,
  isAllLocked,
  randomizeColors,
  savePalette,
}: ColorPaletteCanvasProps) {
  const allLocked = isAllLocked();

  // ref to the root palette div inside ColorPalette (forwardRef required)
  const paletteRef = useRef<HTMLDivElement | null>(null);
  const [exporting, setExporting] = useState(false);

  const exportPalette = async (opts?: {
    type?: "png" | "jpeg";
    quality?: number;
  }) => {
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
    if (!ctx) return;

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

      // swatch
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

      // label
      const labelY = y + swatchH + 28;
      const labelText = hex.toUpperCase();

      ctx.font = "600 14px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      const textW = ctx.measureText(labelText).width;
      const pillW = textW + 22;
      const pillH = 26;
      const pillX = x + swatchW / 2 - pillW / 2;
      const pillY = labelY - pillH / 2;

      // ✅ uniform pill style (no conditionals)
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
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `palette.${type}`;
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
  };

  return (
    <section className="flex-1 flex flex-col border border-calm-3/75 dark:border-white/35 h-[410px] px-5 md:px-10 py-5 rounded-md">
      <div className="flex justify-between items-start">
        <H1 className="mb-5 md:mb-10">Create your palette:</H1>
        <ExportPaletteButton onExport={exportPalette} loading={exporting} />
      </div>
      <ColorPalette
        ref={paletteRef}
        colors={colors}
        colorsLength={colorsLength}
        isNewChip={isNewChip}
        addColorChip={addColorChip}
        removeColorChip={removeColorChip}
        toggleLock={toggleLock}
        copyHexCode={copyHexCode}
      />
      <RandomizeColorsButton allLocked={allLocked} onClick={randomizeColors} />
      <SavePaletteButton savePalette={savePalette} />
    </section>
  );
}
