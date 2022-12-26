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
    const selected = Number(value.substring(0, 2));
    onChange?.(selected);
  };

  return (
    <div className={clsx("custom-select__container relative bg-white cursor-pointer items-center overflow-x-hidden rounded-lg text-base text-light-slate-10 min-w-max", className || "")}>
      <Select.Root onValueChange={handleSelected}>
        <Select.Trigger
          aria-label="Select a limit for the number of repositories to display"
          className="custom-select__trigger inline-flex items-center text-sm text-light-slate-12 px-4 py-1.5 gap-1 w-full bg-white rounded-lg font-semibold outline-none border border-light-slate-6"
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
                    className="custom-select__select-item flex items-center text-sm text-light-slate-12 cursor-pointer relative px-4 py-2 md:py-1 rounded-md outline-none"
                    value={option.name}
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
