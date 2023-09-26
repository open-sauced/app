import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

import { truncateString } from "lib/utils/truncate-string";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SingleSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
}

const SingleSelect = ({ placeholder, value, onValueChange, options }: SingleSelectProps) => {
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger
        className="bg-white min-w-[300px]"
        selectIcon={
          <div className="relative pr-4">
            <RiArrowUpSLine size={16} className="absolute -top-3" />
            <RiArrowDownSLine size={16} className="absolute -bottom-3" />
          </div>
        }
      >
        <SelectValue placeholder={placeholder ?? "Select time zone"} />
      </SelectTrigger>

      <SelectContent position="item-aligned" className="z-50 bg-white">
        {options.map((option, index) => (
          <SelectItem key={`timezone_${index}`} value={option.value}>
            {truncateString(option.label, 30)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SingleSelect;
