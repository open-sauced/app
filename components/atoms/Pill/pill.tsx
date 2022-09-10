import React from "react";

interface PillProps {
    className?: string;
    text: string;
    color?: "slate" | "green" | "yellow" | "red";
    size?: "base" | "small";
    icon?: JSX.Element;
}

const Pill: React.FC<PillProps> = ({ className, text, color = "slate", size = "base", icon}) => {
  return (
    <div 
      className={`
        ${color === "green" ? "bg-light-grass-4" : color === "yellow" ? "bg-light-amber-4" : color === "red" ? "bg-light-red-4" : "bg-light-slate-4"}
        inline-flex py-0.5 px-2 rounded-full`}>
      {icon}

      <div 
        className={`
        ${color === "green" ? "text-light-grass-11" : color === "yellow" ? "text-light-amber-11" : color === "red" ? "text-light-red-11" : "text-light-slate-11"}
          font-medium text-sm`}>
        {text}
      </div>
    </div>
  );
};

export default Pill;