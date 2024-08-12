import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  direction?: "top" | "right" | "left" | "bottom";
  delay?: number;
  className?: string;
  tipClassName?: string;
  defaultOpen?: boolean;
}
const Tooltip = ({ children, content, className, direction, defaultOpen }: TooltipProps): JSX.Element => {
  const { Portal, Root, Content, Trigger, Arrow } = TooltipPrimitive;

  return (
    <Root delayDuration={300} defaultOpen={defaultOpen}>
      <Trigger asChild>
        <div>{children}</div>
      </Trigger>
      <Portal>
        <Content
          sideOffset={4}
          collisionPadding={10}
          side={!!direction ? direction : "bottom"}
          avoidCollisions
          style={{
            zIndex: 9999,
          }}
        >
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
