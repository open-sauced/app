import React from "react";

interface PillProps {
  text: string | number;
  color?: "slate" | "green" | "yellow" | "red" | "purple";
  size?: "base" | "small";
  icon?: React.ReactNode;
}

export const Pill = ({ text, color = "slate", size = "base", icon }: PillProps) => {
  return (
    <div
      style={{
        backgroundColor:
          color === "green"
            ? "hsl(121 47.5% 91.4% / 1)"
            : color === "yellow"
            ? "rgb(253 230 138 / 1)"
            : color === "red"
            ? "hsl(360 97.9% 94.8% / 1)"
            : color === "purple"
            ? "rgb(233 213 255 / 1)"
            : "hsl(209 12.2% 93.2% / 1)",
      }}
      // className={`
      //  ${size === "small" ? "py-1 px-1.5  " : "py-1.5 px-2 "}
      //  inline-flex items-center rounded-full `}
    >
      {icon}

      <div
        style={{
          color:
            color === "green"
              ? "hsl(133 50.0% 32.5% / 1)"
              : color === "yellow"
              ? "rgb(180 83 9 / 1)"
              : color === "red"
              ? "hsl(358 65.0% 48.7% / 1)"
              : color === "purple"
              ? "rgb(147 51 234 / 1)"
              : "hsl(206 6.0% 43.5% / 1)",

          fontSize: "0.875rem",
          lineHeight: 1,
        }}
      >
        {text}
      </div>
    </div>
  );
};
