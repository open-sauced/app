import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";

import { truncateString } from "lib/utils/truncate-string";

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
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));

  const getOptions = () => (isSearchable ? filteredOptions : options);

  useEffect(() => {
    if (isOpen && isSearchable) {
      inputRef.current?.focus();
    }
  }, [isOpen, isSearchable]);

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        onValueChange(value);
      }}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setInputValue("");
        }
      }}
    >
      <SelectTrigger
        className="bg-white min-w-[200px] w-full border focus-within:border-orange-500 focus-within:ring-orange-100 focus-within:ring ring-light-slate-6"
        selectIcon={
          <div className="flex items-center">
            <RiArrowDownSLine size={20} className="" />
          </div>
        }
      >
        <SelectValue className="w-10 truncate" placeholder={placeholder ?? "Select time zone"} />
      </SelectTrigger>

      <SelectContent position={position ?? "item-aligned"} className="z-50 relative bg-white">
        <>
          {isSearchable ? (
            <div className="flex items-center px-3 py-1.5">
              <BiSearch className="mr-1" />

              <input
                ref={inputRef}
                value={inputValue}
                className="w-full py-1.5 text-sm outline-none"
                placeholder={inputPlaceholder ?? "Search Items"}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
            </div>
          ) : null}
          {getOptions().map((option, index) => (
            <SelectItem
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && index === 0) {
                  inputRef.current?.focus();
                }
              }}
              title={option.label}
              key={`timezone_${index}`}
              className="pl-3 !py-2 truncate"
              value={option.value}
            >
              {truncateString(option.label, 30)}
            </SelectItem>
          ))}

          {getOptions().length === 0 && (
            <SelectItem className="pl-3 text-center" value={""}>
              No results found
            </SelectItem>
          )}
        </>
      </SelectContent>
    </Select>
  );
};

export default SingleSelect;
