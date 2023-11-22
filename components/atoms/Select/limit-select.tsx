import React, { useState } from "react";
import clsx from "clsx";
import { RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

interface LimitSelectProps {
  placeholder: string;
  error?: string;
  defaultValue?: limitSelectMap;
  onChange?: (value: string) => void;
  options: { name: string; value: string }[];
  className?: string;
  selected?: string;
}

export type limitSelectMap = "10" | "20" | "30" | "40" | "50";

const LimitSelect = ({ onChange, options, className, placeholder, defaultValue }: LimitSelectProps) => {
  const [selected, setSelected] = useState<null | limitSelectMap>(defaultValue ?? null);
  const handleSelected = (value: limitSelectMap) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div
      className={clsx(
        "radix-state-open:ring radix-state-open:ring-light-orange-5",
        " cursor-pointer text-base items-center overflow-x-hidden",
        "bg-white text-light-slate-10 rounded-lg min-w-max",
        className
      )}
    >
      <Select value={selected as string} onValueChange={onChange}>
        <SelectTrigger
          className={clsx(
            " radix-state-open:border-light-orange-9",
            "relative text-sm items-center overflow-x-hidden",
            "bg-white text-light-slate-12 min-w-max w-full border-light-slate-6"
          )}
          selectIcon={
            <div className="relative pr-4">
              <RiArrowUpSLine size={16} className="absolute -top-3" />
              <RiArrowDownSLine size={16} className="absolute -bottom-3" />
            </div>
          }
        >
          <div className="mr-2">
            <span className="inline-flex mr-1 text-light-slate-9">Showing:</span>
            <SelectValue>
              {selected ? options.find((option) => option.value === selected)?.name : placeholder}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem
              className={clsx(
                "radix-highlighted:bg-light-orange-3 radix-highlighted:text-light-orange-11",
                "flex items-center text-sm px-4 py-2 md:py-1",
                "relative cursor-pointer rounded-md outline-none text-light-slate-12"
              )}
              value={option.value as unknown as string}
              key={option.name}
            >
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LimitSelect;
