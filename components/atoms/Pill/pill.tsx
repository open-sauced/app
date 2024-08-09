import clsx from "clsx";
import React from "react";

export type PillColor = "slate" | "green" | "yellow" | "red" | "purple";

export interface PillProps {
  className?: string;
  text: string | number;
  color?: "slate" | "green" | "yellow" | "red" | "purple";
  size?: "base" | "small" | "xsmall";
  icon?: JSX.Element;
  blurText?: boolean;
}

const Pill: React.FC<PillProps> = ({ className, text, color = "slate", size = "base", icon, blurText = false }) => {
  return (
    <div
      className={`
        ${
          color === "green"
            ? "bg-light-grass-4 "
            : color === "yellow"
            ? "bg-amber-200 "
            : color === "red"
            ? "bg-light-red-4 "
            : color === "purple"
            ? "bg-purple-200"
            : "bg-light-slate-3 "
        }
        ${size === "small" ? "py-1 px-1.5" : "py-1.5 px-2 "}
        inline-flex items-center rounded-full w-fit gap-1 ${className}`}
    >
      <span
        className={`${
          color === "green"
            ? "text-light-grass-11"
            : color === "yellow"
            ? "text-amber-700"
            : color === "red"
            ? "text-light-red-11"
            : color === "purple"
            ? "text-purple-600"
            : "text-light-slate-11"
        }`}
      >
        {icon}
      </span>

      <p
        className={clsx(
          color === "green"
            ? "text-light-grass-11"
            : color === "yellow"
            ? "text-amber-700"
            : color === "red"
            ? "text-light-red-11"
            : color === "purple"
            ? "text-purple-600"
            : "text-light-slate-11",
          size === "xsmall" ? "text-xs" : "text-sm",
          blurText ? "blur-sm" : "",
          "leading-none"
        )}
        style={{
          "--tw-blur": "blur(2.85px)",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default Pill;
