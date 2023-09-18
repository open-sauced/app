import React, { useRef, useState } from "react";
import { HiPencil } from "react-icons/hi";
import clsx from "clsx";

import Title from "../Typography/title";

interface ListNameHeaderProps {
  title?: string;
  onEditTitle?: (value: string) => void;
}
const ListNameHeader = ({ title, onEditTitle }: ListNameHeaderProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    ref.current?.focus();
    // select all text in the span... this is a hacky way to do it and not sure if it's the best way
    document.execCommand("selectAll", false, undefined);
  };

  return (
    <div>
      <Title className="text-base text-sauced-orange">New List</Title>
      <div className="flex items-center gap-3">
        <div className="relative text-3xl w-max">
          <input
            ref={ref}
            onChange={(e) => {
              onEditTitle?.(e.target.value);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onFocus={() => {
              setFocused(true);
            }}
            value={title}
            type="text"
            placeholder="List Name"
            className={clsx("text-3xl w-40 bg-transparent text-light-slate-12 focus:outline-none cursor-text")}
          />
          <span className={clsx("absolute left-0 w-max", focused && "hidden")}>
            {title}

            {title && title.length > 0 && (
              <button onClick={handleFocus} type="button">
                <HiPencil className="ml-2 text-xl" />
              </button>
            )}
          </span>
        </div>
        {!focused && !title && (
          <button onClick={handleFocus} type="button">
            <HiPencil className="ml-2 text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ListNameHeader;
