import React, { useRef, useState } from "react";

import { FiChevronDown } from "react-icons/fi";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";

import { clsx } from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "components/molecules/Popover/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "../Cmd/command";

export type OptionKeys = Record<"value" | "label", string>;

interface MultiSelectProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: OptionKeys[];
  selected: OptionKeys[];
  setSelected?: React.Dispatch<React.SetStateAction<OptionKeys[]>>;
  handleSelect: (value: OptionKeys) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  className?: string;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  emptyState?: React.ReactNode;
}

const MultiSelect = ({
  options,
  selected,
  handleSelect,
  className,
  placeholder,
  handleKeyDown,
  inputPlaceholder,
  setSelected,
  open,
  setOpen,
  emptyState,
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <Popover open={open} onOpenChange={(value) => setOpen(value)}>
      <div>
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
                {selected.length > 1 ? `, +${selected.length - 1}` : null}
              </span>
            ) : (
              <span className="opacity-50">{placeholder ?? "Select Items"}</span>
            )}

            {selected.length > 0 ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSelected?.([]);
                }}
              >
                <IoMdCloseCircle className="text-red-600" />
              </button>
            ) : (
              <FiChevronDown className="ml-2 text-lg opacity-50 shrink-0" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="!w-full bg-white p-0 max-w-sm">
          {options.length > 0 && (
            <Command loop onKeyDown={handleKeyDown} className="w-full px-0 bg-transparent">
              <CommandInput
                ref={inputRef}
                placeholder={inputPlaceholder ?? "Search Items"}
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
          )}
          {options.length === 0 && emptyState ? emptyState : null}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default MultiSelect;
