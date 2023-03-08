import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import clsx from "clsx";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List ref={ref} className={clsx("inline-flex items-center rounded-md px-1 ", className)} {...props} />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    className={clsx(
      className,
      "inline-flex min-w-[100px] items-center justify-center px-3 py-1.5  text-sm font-medium text-slate-700 transition-all  disabled:pointer-events-none disabled:opacity-50  data-[state=active]:text-slate-900"
    )}
    {...props}
    ref={ref}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content className={clsx("mt-2 rounded-md ", className)} {...props} ref={ref} />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
