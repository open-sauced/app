import React, { useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  direction?: "top" | "right" | "left" | "bottom";
  delay?: number;
  className?: string
  tipClassName?: string
}
const Tooltip = ({ children, content, direction, delay, className, tipClassName }: TooltipProps): JSX.Element => {
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
    <div onMouseEnter={()=> showTip()} onMouseLeave={()=> hideTip()} className={`${className && className} relative inline-flex`}>
      {children}
      {active && <div className={`${tipClassName && tipClassName} ${direction === "top" ? "top-[-25px]" : direction === "left" ? "-left-14 -translate-y-1/2 translate-x-0  top-1/2": ""}  absolute z-50 p-1 left-1/2 top-[25px] -translate-x-1/2 bg-dark-slate-2 rounded-[4px] whitespace-nowrap text-dark-slate-12 font-medium text-[10px]`}>{content}</div>}
    </div>
  );
};
export default Tooltip;
