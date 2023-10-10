import React, { useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

import { clsx } from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "components/molecules/Popover/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "../Cmd/command";

export type OptionKeys = Record<"value" | "label", string>;

interface MultiSelectProps {
  options: OptionKeys[];
  selected: OptionKeys[];
  handleSelect: (value: OptionKeys) => void;
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
  handleKeyDown,
  inputPlaceholder,
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");
  const [dummySelected, setDummySelected] = useState<OptionKeys[]>([]);

  // For testing purposes, this component is meant to be stateless.

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
      <div className="">
        <PopoverTrigger
          asChild
          className={clsx("p-1.5 border rounded-md bg-white data-[state=open]:border-orange-500  min-w-max", className)}
        >
          <button
            aria-controls="select-menu-list"
            role="combobox"
            aria-expanded={open}
            className="flex items-center justify-between text-foreground"
          >
            {selected.length > 0 ? (
              <span className="truncate">
                {selected[0].label}
                {selected.length > 1 ? `, +${dummySelected.length - 1}` : null}
              </span>
            ) : (
              <span className="opacity-50">{placeholder ?? "Select Items"}</span>
            )}

            {selected.length > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDummySelected([]);
                }}
              >
                <IoMdCloseCircle className="text-red-600" />
              </button>
            ) : (
              <FiChevronDown className="ml-2 text-lg opacity-50 shrink-0" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="!w-full bg-white p-0 max-w-sm">
          <Command loop onKeyDown={handleKeyDown} className="w-full px-0 bg-transparent">
            <CommandInput
              ref={inputRef}
              placeholder={placeholder ?? "Search Items"}
              value={inputValue}
              onValueChange={setInputValue}
            />
            <CommandGroup className="flex flex-col !px-0 overflow-scroll max-h-48">
              {open && options.length > 0
                ? options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        // toggleFramework(option);
                        handleSelect(option);
                      }}
                      onClick={() => handleSelect(option)}
                      className={clsx(
                        "!cursor-pointer flex justify-between items-center !px-1 rounded-md truncate break-words w-full",
                        selected.some((s) => s.value === option.value) && ""
                      )}
                    >
                      {option.label}
                      {selected.some((s) => s.value === option.value) && (
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
