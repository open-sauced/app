import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  direction?: "top" | "right" | "left" | "bottom";
  delay?: number;
  className?: string
}
const Tooltip = ({ children, content, direction, delay, className }: TooltipProps): JSX.Element => {
  const [active, setActive] = useState(false);
  let timeout: string | number | NodeJS.Timeout | undefined;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };
  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div onMouseEnter={()=> showTip()} onMouseLeave={()=> hideTip()} className="relative inline-flex">
      {children}
      {active && <div className={`${className && className} ${direction === "top" ? "top-[-25px]" : direction === "left" ? "left-[-60px] translate-y[-50%] translate-x-0  top-[50%]": ""}  absolute z-[999] p-1 left-[50%] top-[25px] translate-x-[-50%] bg-dark-slate-2 rounded-[4px] text-dark-slate-12 font-medium text-[10px]`}>{content}</div>}
    </div>
  );
};
export default Tooltip;
