import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";

import clsx from "clsx";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SingleSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  position?: "popper" | "item-aligned";
  className?: string;
}

const SingleSelect = ({ placeholder, value, onValueChange, options, position, className }: SingleSelectProps) => {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger
        className={clsx("bg-white w-full opacity-50 text-sm flex-wrap", className)}
        selectIcon={
          <div className="flex items-center">
            <RiArrowDownSLine size={20} className="" />
          </div>
        }
      >
        <SelectValue className="w-10 capitalize truncate" placeholder={placeholder ?? "Select time zone"} />
      </SelectTrigger>

      <SelectContent position={position ?? "item-aligned"} className="z-50 bg-white select-content">
        {options.map((option, index) => (
          <SelectItem title={option.label} key={`timezone_${index}`} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SingleSelect;
