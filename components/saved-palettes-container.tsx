"use client";

import H1 from "@/components/H1";
import PaletteList from "./palette-list";
import { TPalette } from "@/lib/types/palette";

type SavedPalettesContainerProps = {
  palettes: TPalette[];
  loadPalette: (id: string) => void;
  deletePalette: (id: string) => void;
};

export default function SavedPalettesContainer({
  palettes,
  loadPalette,
  deletePalette,
}: SavedPalettesContainerProps) {
  return (
    <aside className="flex flex-col border border-calm-3/75 dark:border-white/35 px-6 py-4 rounded-md h-[220px] md:h-[410px] w-full md:w-68">
      <H1 className="mb-4">Saved palettes:</H1>
      <PaletteList
        palettes={palettes}
        loadPalette={loadPalette}
        deletePalette={deletePalette}
      />
    </aside>
  );
}
