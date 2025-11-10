type RandomizeColorsButtonProps = {
  onClick: () => void;
};

export default function RandomizeColorsButton({
  onClick,
}: RandomizeColorsButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center p-3 mt-10 rounded-md bg-calm-3/75 hover:bg-calm-3 cursor-pointer duration-200"
    >
      Randomize Colors
    </button>
  );
}
