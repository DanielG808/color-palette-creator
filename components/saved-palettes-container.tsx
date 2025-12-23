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
    <aside className="flex h-full w-full min-w-[300px] flex-col rounded-md border border-calm-3/75 px-5 py-5 dark:border-white/35">
      <H1 className="mb-4 whitespace-normal break-words">Saved palettes:</H1>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <PaletteList
          palettes={palettes}
          loadPalette={loadPalette}
          deletePalette={deletePalette}
        />
      </div>
    </aside>
  );
}
