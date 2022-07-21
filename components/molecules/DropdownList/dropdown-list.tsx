import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import Text from "components/atoms/Typography/text";

const DropdownList: React.FC = () => (
  <HoverCardPrimitive.Root>
    <HoverCardPrimitive.Trigger asChild>
      <div className={"inline-flex h-12 w-12 items-center justify-center rounded-full bg-white dark:bg-white"}>
        <Text>Hello</Text>
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
      <HoverCardPrimitive.Arrow offset={12} className="fill-current text-white dark:text-gray-800" />

      <div className="flex h-full w-full space-x-4">
        <div
          className={"flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900"}
        >
          <Text>Hello</Text>
        </div>
      </div>
    </HoverCardPrimitive.Content>
  </HoverCardPrimitive.Root>
);

export default DropdownList;