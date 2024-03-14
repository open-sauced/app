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
    ref?.current?.focus();
  };

  return (
    <div>
      <Title className="text-base text-sauced-orange">New Contributor Insight</Title>
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
            onFocus={(e) => {
              setFocused(true);
              e.target.select();
            }}
            autoFocus
            value={title}
            type="text"
            placeholder="Contributor Insight Name"
            className={clsx(
              "text-3xl w-40 bg-transparent text-light-slate-12 focus:outline-none cursor-text",
              !focused && "!text-white"
            )}
          />
          <span className={clsx("absolute left-0 w-max", focused && "invisible")}>
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
