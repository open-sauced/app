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
    <div className="">
      {icon}

      
    </div>
  );
};

export default Pill;