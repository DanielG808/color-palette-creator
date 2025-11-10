"use client";

import H1 from "@/components/H1";
import ColorPalette from "./color-palette";

export default function ColorPaletteCanvas() {
  return (
    <section className="flex flex-col justify-center border border-calm-3/75 px-10 py-4 rounded-md">
      <H1 className="text-xl mb-10">Create your palette:</H1>
      <ColorPalette />
    </section>
  );
}
