import React from "react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";

import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { MdCheck } from "react-icons/md";

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

  return (
    <Select.Root>
      <div className={clsx("relative bg-white cursor-pointer focus:border-light-orange-9 focus:ring focus:ring-light-orange-9 items-center overflow-x-hidden rounded-lg text-base text-light-slate-10 min-w-min", className ? className : "")}>
        <Select.Trigger
          aria-label="Select a limit for the number of repositories to display"
          className="inline-flex items-center text-sm text-light-slate-12 px-2 py-1.5 gap-2 w-full bg-white rounded-lg border border-light-slate-6 focus:outline-none focus-within:border-light-orange-8 focus-within:ring focus-within:ring-light-orange-8"
        >
          {label && <span className="inline-flex text-light-slate-9">{label}:</span>}
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <RiArrowUpSLine className="w-3 h-3" />
            <RiArrowDownSLine className="w-3 h-3" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={clsx("absolute right-0 top-12 bg-white overflow-hidden rounded-lg border shadow-superlative font-normal z-50", label ? "-left-10" : "left-0")}
          >
            <Select.Viewport className="p-2">
              {options ?
                options.map((option) => (
                  <Select.Item
                    key={option.name}
                    className="custom-select__select-item flex items-center text-light-slate-12 relative pl-8 pr-5 py-1.5 rounded-md outline-none"
                    value={option.name}
                    onClick={() => onChange?.(option.value)}
                  >
                    <Select.ItemText>{option.name}</Select.ItemText>
                    <Select.ItemIndicator
                      className="absolute left-0 inline-flex items-center justify-center w-6"
                    >
                      <MdCheck
                        className="ml-2 text-light-orange-9"
                      />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))
                : "No options"
              }
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
};

export default CustomSelect;
