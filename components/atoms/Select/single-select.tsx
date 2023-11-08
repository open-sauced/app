import React, { useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

import { truncateString } from "lib/utils/truncate-string";

import { Command, CommandGroup, CommandInput, CommandItem } from "../Cmd/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

interface SingleSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  options: { label: string; value: string }[];
  position?: "popper" | "item-aligned";
  isSearchable?: boolean;
}

const SingleSelect = ({
  placeholder,
  value,
  onValueChange,
  options,
  position,
  inputPlaceholder,
  isSearchable = false,
}: SingleSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  return (
    <Select value={value} onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger
        className="bg-white min-w-[200px] w-full"
        selectIcon={
          <div className="flex items-center">
            <RiArrowDownSLine size={20} className="" />
          </div>
        }
      >
        <SelectValue className="w-10 truncate" placeholder={placeholder ?? "Select time zone"} />
      </SelectTrigger>

      <SelectContent position={position ?? "item-aligned"} className="z-50 relative bg-white">
        {isSearchable ? (
          <Command loop onKeyDown={() => {}} className="w-full px-0 bg-transparent">
            <CommandInput
              ref={inputRef}
              placeholder={inputPlaceholder ?? "Search Items"}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandGroup className="flex flex-col !px-0 overflow-scroll max-h-[25rem]">
              {options.map((option, index) => (
                <CommandItem
                  key={`timezone_${index}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="!px-3 rounded-md truncate"
                >
                  <SelectItem key={`timezone_${index}`} className="!px-0" title={option.label} value={option.value}>
                    {truncateString(option.label, 30)}
                  </SelectItem>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        ) : (
          <>
            {options.map((option, index) => (
              <SelectItem title={option.label} key={`timezone_${index}`} value={option.value}>
                {truncateString(option.label, 30)}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default SingleSelect;
