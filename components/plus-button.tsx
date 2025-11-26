import { PlusIcon } from "lucide-react";

type PlusButtonProps = {
  onClick: () => void;
};

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-12 h-12 md:w-24 md:h-24 rounded-full text-calm-5/75 dark:text-white/75 bg-calm-2/50 dark:bg-white/25 hover:text-calm-5 dark:hover:text-white hover:bg-calm-2 dark:hover:bg-white/45 cursor-pointer duration-200"
    >
      <PlusIcon />
    </button>
  );
}
