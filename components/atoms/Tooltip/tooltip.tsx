import React, { useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  direction?: "top" | "right" | "left" | "bottom";
  delay?: number;
  className?: string
  tipClassName?: string
}
const Tooltip = ({ children, content, className, direction }: TooltipProps): JSX.Element => {

  const {Portal, Root, Content, Trigger} = TooltipPrimitive;
  // const [active, setActive] = useState(false);
  // let timeout: string | number | NodeJS.Timeout | undefined;

  // const showTip = () => {
  //   timeout = setTimeout(() => {
  //     setActive(true);
  //   }, delay || 400);
  // };
  // const hideTip = () => {
  //   clearInterval(timeout);
  //   setActive(false);
  // };

  return (
    <Root>
     
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <Content side={!!direction ? direction : "bottom"}>
          <div className={`${className && className} text-[10px] p-1 rounded-[4px] bg-dark-slate-2 text-dark-slate-12 font-medium`}>{content}</div>
        </Content>
      </Portal>
    </Root>
  );
};

export const TipProvider = TooltipPrimitive.Provider;

export default Tooltip;
