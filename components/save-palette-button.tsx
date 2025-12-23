type SavePaletteButtonProps = {
  savePalette: () => void;
};

export default function SavePaletteButton({
  savePalette,
}: SavePaletteButtonProps) {
  return (
    <button
      onClick={savePalette}
      className="
        w-full
        flex justify-center items-center
        p-3 mt-3
        rounded-md
        bg-calm-3/75 dark:bg-white/25
        hover:bg-calm-3 dark:hover:bg-white/35
        cursor-pointer duration-200
        disabled:cursor-not-allowed
        disabled:bg-calm-2/50
        disabled:text-calm-5/50
      "
    >
      Save Palette
    </button>
  );
}
