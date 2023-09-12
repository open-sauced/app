import clsx from "clsx";
import React from "react";
import { MdClose } from "react-icons/md";

interface FilterChipProps {
  className?: string;
  items: string[];
  onClear: () => void;
}
const FilterChip = ({ className, items, onClear }: FilterChipProps) => {
  return (
    <div
      className={clsx(
        "p-2.5 rounded-xl bg-sauced-light w-max text-sauced-orange max-w-[200px] flex items-center",
        className
      )}
    >
      <span className="max-w-[75%] truncate">{items[0]}</span>
      {items.length > 1 && <span className="text-sauced-orange"> ,+{items.length - 1}</span>}
      <MdClose onClick={onClear} className="ml-1 text-2xl" />
    </div>
  );
};

export default FilterChip;
