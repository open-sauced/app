import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";

import clsx from "clsx";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Command, CommandGroup, CommandInput, CommandItem } from "../Cmd/command";
import Tooltip from "../Tooltip/tooltip";
interface SingleSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  inputPlaceholder?: string;
  options: { label: string; value: string; icon?: React.ReactElement }[];
  position?: "popper" | "item-aligned";
  isSearchable?: boolean;
  insetLabel?: string;
}

const SingleSelect = ({
  placeholder,
  value,
  onValueChange,
  options,
  position,
  inputPlaceholder,
  isSearchable = false,
  insetLabel,
}: SingleSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const current = options.find((option) => option.value === value);

  useEffect(() => {
    if (isOpen && isSearchable) {
      // TODO: Revisit this. There's a timing issue where the input's ref is set when the dropdown is opened
      // but it still can't receive focus. This is a workaround to focus the input after
      // the dropdown is opened.
      setTimeout(() => {
        if (isOpen && isSearchable) {
          inputRef.current?.focus();
        }
      });
    }
  }, [isOpen, isSearchable]);

  return (
    <DropdownMenu
      open={isOpen}
      modal={false}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setInputValue("");
        }
      }}
    >
      <DropdownMenuTrigger
        data-inset-label={insetLabel}
        className={clsx(
          "flex w-full justify-between md:w-fit text-sm px-3 py-1.5 !border !border-slate-200 rounded-md bg-white data-[state=open]:border-orange-500 min-w-max",
          insetLabel && `before:content-[attr(data-inset-label)] before:mr-1 before:font-normal before:text-slate-500`
        )}
      >
        <Tooltip content={current?.label ?? placeholder}>
          <div className="flex items-center w-44 ">
            <p className="flex-grow text-start truncate">{current?.label ?? placeholder}</p>
          </div>
        </Tooltip>

        <div className="flex items-center">
          <RiArrowDownSLine size={20} className="w-5 text-slate-400" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="!p-0 z-50 relative bg-white w-[90vw] md:w-auto my-1 border shadow-lg rounded-lg">
        <>
          {options.length > 0 && (
            <Command loop className="w-full px-0 pt-1 bg-transparent">
              {isSearchable && (
                <CommandInput
                  ref={inputRef}
                  placeholder={inputPlaceholder ?? "Search Items"}
                  value={inputValue}
                  onValueChange={setInputValue}
                  className="px-2 focus:ring-0"
                />
              )}
              <CommandGroup className="flex flex-col overflow-x-hidden overflow-y-scroll max-h-52">
                {isOpen && options.length > 0
                  ? options.map((option) => {
                      const Icon = option.icon;
                      return (
                        <CommandItem
                          key={option.value}
                          onSelect={(value) => {
                            setInputValue("");
                            setIsOpen(false);
                            onValueChange(option.value);
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setIsOpen(false);
                            onValueChange(option.value);
                          }}
                          onClick={() => {
                            setIsOpen(false);
                            onValueChange(option.value);
                          }}
                          className="!z-50 !cursor-pointer flex justify-between min-w-[7rem] items-center !px-3 rounded-md truncate break-words w-full"
                        >
                          {Icon ? (
                            <div className="flex items-center">
                              {Icon}
                              <span className="ml-1">{option.label}</span>
                            </div>
                          ) : (
                            option.label
                          )}
                        </CommandItem>
                      );
                    })
                  : null}
              </CommandGroup>
            </Command>
          )}
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SingleSelect;
