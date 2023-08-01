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
  title,
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
    <TypographyWrapper
      className={clsx(
        className,
        disabled && "cursor-not-allowed select-none text-light-slate-11/50",
        keyboard && "bg-light-slate-4/50 rounded px-2 border border-b-2 border-light-slate-8/50",
        underline && "underline",
        strikethrough && "line-through",
        getTypeClass(type)
      )}
      {...props}
    >
      <TextTag title={title}>{children}</TextTag>
    </TypographyWrapper>
  );
};

export default Text;
