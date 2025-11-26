"use client";

// components
import H1 from "@/components/H1";
import PaletteList from "./palette-list";

// types
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
    <aside className="flex-1 flex flex-col border border-calm-3/75 dark:border-white/35 px-8 py-5 rounded-md h-[410px] w-68">
      <H1 className="text-xl mb-4">Saved palettes:</H1>
      <PaletteList
        palettes={palettes}
        loadPalette={loadPalette}
        deletePalette={deletePalette}
      />
    </aside>
  );
}
