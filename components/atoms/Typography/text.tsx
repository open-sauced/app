/* eslint-disable prettier/prettier */
import React from "react";
import clsx from "clsx";

import TypographyWrapper from "./wrapper";

interface TextProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  type?: "default" | "secondary" | "success" | "warning" | "danger";
  disabled?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  strong?: boolean;
  small?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  className,
  type = "default",
  disabled,
  mark,
  code,
  keyboard,
  underline,
  strikethrough,
  strong,
  small,
  ...props
}) => {
  const TextTag = (() => {
    if (mark) return "mark";
    if (code) return "code";
    if (keyboard) return "kbd";
    if (strong) return "strong";
    if (small) return "small";
    return "span";
  })() as keyof JSX.IntrinsicElements;

  const getTypeClass = (type: string) => {
    if (type === "secondary") return "!text-light-slate-5";
    if (type === "success") return "!text-dark-grass-10";
    if (type === "warning") return "!text-yellow-500";
    if (type === "danger") return "!text-dark-red-10";
    return "";
  };

  return (
    <TypographyWrapper>
      <TextTag
        className={clsx(
          disabled && "cursor-not-allowed select-none text-light-slate-11/50",
          keyboard && "text-white bg-dark-slate-5 rounded shadow-input px-2 py-1 border border-light-slate-11/50",
          underline && "underline",
          strikethrough && "line-through",
          getTypeClass(type)
        )}
        {...props}
      >
        {children}
      </TextTag>
    </TypographyWrapper>
  );
};

export default Text;
