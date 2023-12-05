import React from "react";

export interface PillProps {
  className?: string;
  text: string | number;
  color?: "slate" | "green" | "yellow" | "red" | "purple";
  size?: "base" | "small";
  icon?: JSX.Element;
}

const Pill: React.FC<PillProps> = ({ className, text, color = "slate", size = "base", icon }) => {
  return (
    <div
      className={`
        ${
          color === "green"
            ? "bg-light-grass-2 border-light-grass-6"
            : color === "yellow"
            ? "bg-yellow-50 border-amber-200"
            : color === "red"
            ? "bg-red-50 border-red-200"
            : color === "purple"
            ? "bg-purple-50 border-purple-200"
            : "bg-slate-50 border-slate-200"
        }
        ${size === "small" ? "py-1 px-1.5  " : "py-1.5 px-2 "}
        ${icon ? "pr-3" : " "}
        inline-flex items-center rounded-full gap-1 border-1 ${className}`}
    >
      {icon}

      <div
        className={`
        ${
          color === "green"
            ? "text-light-grass-10"
            : color === "yellow"
            ? "text-amber-700"
            : color === "red"
            ? "text-light-red-11"
            : color === "purple"
            ? "text-purple-600"
            : "text-light-slate-11"
        }
            text-sm leading-none`}
      >
        {text}
      </div>
    </div>
  );
};

export default Pill;
