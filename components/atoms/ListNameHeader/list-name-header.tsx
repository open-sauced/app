import React, { useRef } from "react";
import { HiPencil } from "react-icons/hi";
import clsx from "clsx";

import Title from "../Typography/title";

interface ListNameHeaderProps {
  title?: string;
  onEditTitle?: (value: string) => void;
}
const ListNameHeader = ({ title, onEditTitle }: ListNameHeaderProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const handleFocus = () => {
    ref.current?.focus();
    // select all text in the span... this is a hacky way to do it and not sure if it's the best way
    document.execCommand("selectAll", false, undefined);
  };

  return (
    <div>
      <Title className="text-base text-sauced-orange">New List</Title>
      <div className="flex items-center gap-3">
        {/* Using a span to mimic an input because native inputs can't auto grow in width relative to it's content
         ** https://css-tricks.com/auto-growing-inputs-textareas/
         */}
        <span
          ref={ref}
          onInput={(e) => {
            onEditTitle && onEditTitle(e.currentTarget.textContent ?? "");
          }}
          suppressContentEditableWarning
          className={clsx("text-3xl auto-grow-input text-gray-300 focus:outline-none cursor-text")}
          role="text-box"
          contentEditable
        >
          {title}
        </span>
        <button onClick={handleFocus} type="button">
          <HiPencil className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ListNameHeader;
