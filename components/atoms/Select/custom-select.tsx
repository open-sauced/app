import React from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

interface SelectProps {
  placeholder: string;
  error?: string;
  onChange?: Function;
  label?: string;
  options: { name: string; value: any }[];
  className?: string;
}

const CustomSelect = ({
  placeholder = "Select an option",
  options,
  label,
  className,
  onChange
}: SelectProps): JSX.Element => {
  const handleSelected = (value: string) => {
    const selected = Number(value);
    onChange?.(selected);
  };

  return (
    <div className={clsx(
      "radix-state-open:ring radix-state-open:ring-light-orange-5",
      "relative cursor-pointer text-base items-center overflow-x-hidden",
      "bg-white text-light-slate-10 rounded-lg min-w-max",
      className || ""
    )}>
      <Select.Root onValueChange={handleSelected}>
        <Select.Trigger
          aria-label="Select a limit for the number of repositories to display"
          className={clsx(
            "radix-state-open:border-light-orange-9",
            "inline-flex items-center gap-1 px-4 py-1.5",
            "w-full text-sm outline-none rounded-lg font-semibold",
            "text-light-slate-12 bg-white border border-light-slate-6")}
        >
          {label && <span className="inline-flex text-light-slate-9">{label}:</span>}
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="w-4 h-4 relative overflow-hidden">
            <RiArrowUpSLine className="absolute bottom-1" />
            <RiArrowDownSLine className="absolute top-1" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={clsx("absolute right-0 top-9 bg-white overflow-hidden rounded-lg border shadow-superlative", label ? "-left-18" : "left-0")}
          >
            <Select.Viewport>
              {options ?
                options.map((option) => (
                  <Select.Item
                    key={option.name}
                    className={clsx(
                      "radix-highlighted:bg-light-orange-3 radix-highlighted:text-light-orange-11",
                      "flex items-center text-sm px-4 py-2 md:py-1",
                      "relative cursor-pointer rounded-md outline-none text-light-slate-12"
                    )}
                    value={option.value}
                  >
                    <Select.ItemText>{option.name}</Select.ItemText>
                  </Select.Item>
                ))
                : "No options"
              }
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default CustomSelect;
