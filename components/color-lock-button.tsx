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
    <button
      onClick={() => toggleLock(index)}
      className="duration-200 cursor-pointer"
    >
      {locked ? (
        <LockIcon className="text-calm-5 hover:text-black" />
      ) : (
        <LockOpenIcon className="text-calm-4/75 hover:text-black" />
      )}
    </button>
  );
}
