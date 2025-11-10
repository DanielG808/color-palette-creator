import { PlusIcon } from "lucide-react";

type PlusButtonProps = {
  onClick: () => void;
};

export default function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center w-24 h-24 rounded-full text-calm-5/75 bg-calm-2/50 hover:text-calm-5 hover:bg-calm-2 cursor-pointer duration-200"
    >
      <PlusIcon />
    </button>
  );
}
