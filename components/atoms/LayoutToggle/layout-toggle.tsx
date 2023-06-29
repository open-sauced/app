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
    <div className="flex h-8 border rounded-lg shadow-md w-28 p-[1px] text-light-slate-9">
      <div
        onClick={() => handleToggle("list")}
        role="toggle"
        className={clsx(
          "flex items-center cursor-pointer justify-center flex-1 transition rounded-lg",
          value === "list" && "bg-light-slate-4 "
        )}
      >
        <BsListUl className="text-2xl" />
      </div>
      <div
        onClick={() => handleToggle("grid")}
        role="toggle"
        className={clsx(
          "flex items-center justify-center flex-1 rounded-lg transition cursor-pointer",
          value === "grid" && "bg-light-slate-4 "
        )}
      >
        <BiGridAlt className="text-2xl" />
      </div>
    </div>
  );
};

export default LayoutToggle;
