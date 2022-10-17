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


  return (
    <Root>

      <Trigger asChild>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <Content collisionPadding={10} side={!!direction ? direction : "bottom"} avoidCollisions>
          <div className={`${className && className} text-xs py-1 px-2 rounded shadow-lg  bg-dark-slate-2 text-dark-slate-12 font-medium`}>{content}</div>
        </Content>
      </Portal>
    </Root>
  );
};

export const TipProvider = TooltipPrimitive.Provider;

export default Tooltip;
