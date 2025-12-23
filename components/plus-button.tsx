// components/plus-button.tsx
import { PlusIcon } from "lucide-react";

type PlusButtonProps = {
  onClick: () => void;
};

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Add color"
      className="
        flex justify-center items-center rounded-full
        cursor-pointer duration-200
        text-calm-5/75 dark:text-white/75
        bg-calm-2/50 dark:bg-white/25
        hover:text-calm-5 dark:hover:text-white
        hover:bg-calm-2 dark:hover:bg-white/45

        w-14 h-14
        sm:w-16 sm:h-16
        md:w-20 md:h-20
        lg:w-24 lg:h-24
      "
    >
      <PlusIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
    </button>
  );
}
