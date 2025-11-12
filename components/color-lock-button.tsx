import { LockIcon, LockOpenIcon } from "lucide-react";

type ColorLockButtonProps = {
  index: number;
  locked: boolean;
  toggleLock: (index: number) => void;
};

export default function ColorLockButton({
  index,
  locked,
  toggleLock,
}: ColorLockButtonProps) {
  return (
    <button onClick={() => toggleLock(index)} className="cursor-pointer">
      {locked ? (
        <LockIcon className="text-calm-5 dark:text-white/75 hover:text-black dark:hover:text-white duration-200" />
      ) : (
        <LockOpenIcon className="text-calm-4/75 dark:text-white/50 hover:text-black dark:hover:text-white/75 duration-200" />
      )}
    </button>
  );
}
