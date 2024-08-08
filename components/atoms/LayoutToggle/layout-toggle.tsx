import React from "react";

import { BsListUl } from "react-icons/bs";
import { BiGridAlt } from "react-icons/bi";
import clsx from "clsx";

export type ToggleValue = "grid" | "list";
interface LayoutToggleProps {
  onChange?: (value: ToggleValue) => void;
  value?: ToggleValue;
}
const LayoutToggle = ({ value, onChange }: LayoutToggleProps) => {
  const handleToggle = (value: ToggleValue) => {
    onChange?.(value);
  };

  return (
    <div className="flex h-8 border rounded-lg shadow-xs w-28 p-[1px] text-light-slate-9">
      <button
        role="radio"
        aria-checked={value === "list"}
        name="layout"
        onClick={() => handleToggle("list")}
        className={clsx(
          "flex items-center cursor-pointer justify-center flex-1 transition rounded-lg border border-transparent",
          value === "list" && "bg-light-slate-4"
        )}
      >
        <span className="sr-only">Contributor list view</span>
        <BsListUl className="text-2xl" />
      </button>
      <button
        role="radio"
        aria-checked={value === "grid"}
        name="layout"
        onClick={() => handleToggle("grid")}
        className={clsx(
          "flex items-center justify-center flex-1 rounded-lg transition cursor-pointer border border-transparent",
          value === "grid" && "bg-light-slate-4"
        )}
      >
        <span className="sr-only">Contributor grid view</span>
        <BiGridAlt className="text-2xl" />
      </button>
    </div>
  );
};

export default LayoutToggle;
