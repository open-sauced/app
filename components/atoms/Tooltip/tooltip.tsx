import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  direction?: "top" | "right" | "left" | "bottom";
  delay?: number;
  className?: string;
  tipClassName?: string;
}
const Tooltip = ({ children, content, className, direction }: TooltipProps): JSX.Element => {
  const { Portal, Root, Content, Trigger, Arrow } = TooltipPrimitive;

  return (
    <Root>
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <Content sideOffset={4} collisionPadding={10} side={!!direction ? direction : "bottom"} avoidCollisions>
          <div className={clsx("text-xs py-1 px-2 rounded shadow-lg  bg-dark-slate-2 text-dark-slate-12", className)}>
            {content}
          </div>
          <Arrow className="fill-dark " />
        </Content>
      </Portal>
    </Root>
  );
};

export const TipProvider = TooltipPrimitive.Provider;

export default Tooltip;
