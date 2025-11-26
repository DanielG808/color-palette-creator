type RandomizeColorsButtonProps = {
  allLocked: boolean;
  onClick: () => void;
};

export default function RandomizeColorsButton({
  allLocked,
  onClick,
}: RandomizeColorsButtonProps) {
  return (
    <button
      disabled={allLocked}
      onClick={onClick}
      className="flex justify-center items-center p-3 mt-6 md:mt-10 rounded-md text-background dark:text-calm-2 bg-blue-950/75 dark:bg-slate-900 hover:bg-blue-950/85 dark:hover:bg-slate-950 cursor-pointer duration-200 disabled:cursor-not-allowed
  disabled:bg-blue-950/35 dark:disabled:bg-slate-800/40
  disabled:text-calm-1/70 dark:disabled:text-calm-3/50"
    >
      Randomize Colors
    </button>
  );
}
