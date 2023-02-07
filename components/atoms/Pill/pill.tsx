import React from "react";

interface PillProps {
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
      ? "bg-light-grass-4 "
      : color === "yellow"
        ? "bg-amber-200 "
        : color === "red"
          ? "bg-light-red-4 "
          : color === "purple"
            ? "bg-purple-200"
            : "bg-light-slate-4 "
    }
        ${size === "small" ? "py-1 px-1.5  " : "py-1.5 px-2 "}
        inline-flex items-center rounded-full gap-1 ${className}`}
    >
      {icon}

      <div
        className={`
        ${
    color === "green"
      ? "text-light-grass-11"
      : color === "yellow"
        ? "text-light-amber-10"
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
