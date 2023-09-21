import React, { useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";

import { clsx } from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "components/molecules/Popover/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "../Cmd/command";

export type OptionKeys = Record<"value" | "label", string>;

interface MultiSelectProps {
  options: OptionKeys[];
  selected: OptionKeys[];
  handleSelect: (value: OptionKeys["value"]) => void;
  handleUnSelect: (option: OptionKeys["value"]) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  className?: string;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const MultiSelect = ({
  options,
  selected,
  handleSelect,
  className,
  placeholder,
  handleUnSelect,
  handleKeyDown,
  inputPlaceholder,
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dummySelected, setDummySelected] = useState<OptionKeys[]>([]);

  // For testing purposes, this component is meant to be stateless.
  const dummyOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
    { value: "4", label: "Option 4" },
    { value: "5", label: "Option 5" },
    { value: "6", label: "Option 6" },
    { value: "7", label: "Option 7" },
    { value: "8", label: "Option 8" },
    { value: "9", label: "Option 9" },
    { value: "10", label: "Option 10" },
    { value: "11", label: "Option 11" },
    { value: "12", label: "Option 12" },
    { value: "13", label: "Option 13" },
    { value: "14", label: "Option 14" },
    { value: "15", label: "Option 15" },
    { value: "16", label: "Option 16" },
    { value: "17", label: "Option 17" },
    { value: "18", label: "Option 18" },
    { value: "19", label: "Option 19" },
    { value: "20", label: "Option 20" },
  ];

  const toggleFramework = (option: OptionKeys) => {
    const isOptionSelected = dummySelected.some((s) => s.value === option.value);
    if (isOptionSelected) {
      setDummySelected((prev) => prev.filter((s) => s.value !== option.value));
    } else {
      setDummySelected((prev) => [...prev, option]);
    }
    inputRef?.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <div className="max-w-xs min-w-[250px]">
        <PopoverTrigger asChild className="p-1.5 border rounded-md  max-w-xs min-w-[250px]">
          <button
            aria-controls="select-menu-list"
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between text-foreground"
          >
            {dummySelected.length > 0 ? (
              <span className="truncate">
                {dummySelected[0].label}
                {dummySelected.length > 1 ? `, +${dummySelected.length - 1}` : null}
              </span>
            ) : (
              <span className="opacity-50">{placeholder ?? "Select Items"}</span>
            )}

            <FiChevronDown className="w-5 h-5 ml-2 opacity-50 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="!w-full !min-w-[250px] p-0">
          <Command loop onKeyDown={handleKeyDown} className="w-full px-0 bg-transparent">
            <CommandInput
              ref={inputRef}
              placeholder={placeholder ?? "Search Items"}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandGroup className="flex flex-col !px-0 overflow-scroll max-h-48">
              {open && dummyOptions.length > 0
                ? dummyOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        toggleFramework(option);
                      }}
                      onClick={() => toggleFramework(option)}
                      className={clsx(
                        "!cursor-pointer flex justify-between items-center !px-1 rounded-md",
                        dummySelected.some((s) => s.value === option.value) && "bg-gray-100"
                      )}
                    >
                      {option.label}
                      {dummySelected.some((s) => s.value === option.value) && (
                        <IoCheckmarkSharp className="w-5 h-5 ml-2 text-sauced-orange shrink-0" />
                      )}
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default MultiSelect;
