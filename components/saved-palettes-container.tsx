"use client";

import H1 from "@/components/H1";
import { TPalette } from "@/lib/types/palette";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PaletteList from "./palette-list";

export default function SavedPalettesContainer() {
  const [palettes, setPalettes] = useState<TPalette[]>([]);

  function getPalettes() {
    try {
      const stored = localStorage.getItem("palettes");
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch (error) {
      toast.warning("Failed to retrieve saved palettes.");
      console.warn("Failed to parse palettes from localStorage:", error);
      return [];
    }
  }

  useEffect(() => {
    setPalettes(getPalettes);
  }, []);

  return (
    <aside className="flex-1 flex flex-col border border-calm-3/75 px-8 py-5 rounded-md h-[450px]">
      <H1 className="text-xl mb-4">Saved palettes:</H1>
      <PaletteList palettes={palettes} />
    </aside>
  );
}
