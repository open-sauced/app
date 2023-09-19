import React, { useRef, useState } from "react";

import { Command as CommandPrimitive } from "cmdk";
import { Command, CommandGroup, CommandItem } from "../Cmd/command";

export type OptionKeys = Record<"value" | "label", string>;

interface MultiSelectProps {
  options: OptionKeys[];
  selected: OptionKeys[];
  handleSelect: (value: OptionKeys["value"]) => void;
  handleUnSelect: (option: OptionKeys["value"]) => void;
  placeholder?: string;
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
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");

  // const handleUnselect = useCallback((option: OptionKeys) => {
  //   setSelected((prev) => prev.filter((s) => s.value !== option.value));
  // }, []);

  // const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
  //   const input = inputRef.current;
  //   if (input) {
  //     if (e.key === "Delete" || e.key === "Backspace") {
  //       if (input.value === "") {
  //         setSelected((prev) => {
  //           const newSelected = [...prev];
  //           newSelected.pop();
  //           return newSelected;
  //         });
  //       }
  //     }
  //     // This is not a default behaviour of the <input /> field
  //     if (e.key === "Escape") {
  //       input.blur();
  //     }
  //   }
  // }, []);

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent w-96">
      <div className="px-3 py-2 text-sm border rounded-md group">
        <div className="flex flex-wrap gap-1">
          <div>
            {selected[0].label}
            {selected.length > 1 ? `, +${selected.length - 1}` : null}
            {/* <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnSelect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnSelect(option)}
                ></button> */}
          </div>

          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder ?? "Search options..."}
            className="flex-1 ml-2 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && options.length > 0 ? (
          <div className="absolute top-0 z-10 w-full border rounded-md shadow-md outline-none bg-popover text-popover-foreground animate-in">
            <CommandGroup className="flex flex-col gap-2 overflow-auto h-max">
              {options.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      handleSelect(value);
                    }}
                    className={"!cursor-pointer"}
                  >
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
};

export default MultiSelect;
