import { XIcon } from "lucide-react";

type ColorChipProps = {
  numColors: number;
};

export default function ColorChip({ numColors }: ColorChipProps) {
  return (
    <div className="group relative inline-block">
      {numColors > 3 && (
        <button className="absolute top-0 -right-6 p-1 text-calm-5/75 hover:text-calm-5 cursor-pointer opacity-0 group-hover:opacity-100 duration-200">
          <XIcon />
        </button>
      )}

      <div className="flex justify-center items-center border border-calm-4/75 rounded-full w-24 h-24 shadow-lg hover:shadow-2xl duration-200">
        <div className="bg-[#F54927] rounded-full w-20 h-20" />
      </div>
    </div>
  );
}
