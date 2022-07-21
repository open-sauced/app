import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

interface DropdownListProps {
  children: React.ReactNode;
  componentAsDropdown: JSX.Element;
}

const DropdownList: React.FC<DropdownListProps> = ({ children, componentAsDropdown }) => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <div className={"inline-flex h-12 w-12 items-center justify-center rounded-full bg-white"}>
        {children}
      </div>
    </HoverCardPrimitive.Trigger>
    <HoverCardPrimitive.Content
      align="center"
      sideOffset={4}
      className={
        " radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down" +
        "max-w-md rounded-lg p-4 md:w-full" +
        "bg-white dark:bg-gray-800" +
        "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75" +
        "items-center md:drop-shadow-[0_15px_15px_rgba(0,0,0,0.45)] !opacity-100"
      }
    >
      <HoverCardPrimitive.Arrow offset={12} className="fill-current text-white" />

      <div className="flex h-full w-full space-x-4">
        <div
          className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100"}
        >
          {componentAsDropdown}
        </div>
      </div>
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Root>
);

export default DropdownList;