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
      className="flex justify-center items-center p-3 mt-10 rounded-md text-background bg-blue-950/75 hover:bg-blue-950/85 cursor-pointer duration-200 disabled:cursor-not-allowed disabled:bg-blue-950/35 disabled:text-calm-1/70"
    >
      Randomize Colors
    </button>
  );
}
