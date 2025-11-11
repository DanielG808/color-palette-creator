"use client";

// components
import H1 from "@/components/H1";
import PaletteList from "./palette-list";

// hooks
import useColorPaletteCreator from "@/lib/hooks/useColorPaletteCreator";
import { TPalette } from "@/lib/types/palette";

type SavedPalettesContainerProps = {
  palettes: TPalette[];
};

export default function SavedPalettesContainer({
  palettes,
}: SavedPalettesContainerProps) {
  return (
    <aside className="flex-1 flex flex-col border border-calm-3/75 px-8 py-5 rounded-md h-[410px]">
      <H1 className="text-xl mb-4">Saved palettes:</H1>
      <PaletteList palettes={palettes} />
    </aside>
  );
}
