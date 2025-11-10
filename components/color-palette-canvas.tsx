import ColorChip from "@/components/color-chip";
import H1 from "@/components/H1";

export default function ColorPaletteCanvas() {
  return (
    <section className="flex flex-col justify-center border border-calm-3/75 px-4 py-2 rounded-md">
      <H1 className="text-xl mb-4">Create your palette:</H1>

      <ColorChip />
    </section>
  );
}
