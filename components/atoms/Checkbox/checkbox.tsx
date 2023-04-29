import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FiCheck } from "react-icons/fi";

import clsx from "clsx";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, label, id = "checkbox", ...props }, ref) => (
  <div className="flex items-center">
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        "peer h-4 w-4 shrink-0 rounded-md cursor-pointer bg-white border border-light-slate-8 hover:border-orange-500 ring-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-orange-500 data-[state=checked]:ring-orange-500 data-[state=checked]:bg-orange-500",
        className
      )}
      {...props}
      id={id}
    >
      <CheckboxPrimitive.Indicator
        className={clsx("flex items-center justify-center text-white")}
      >
        <FiCheck className="h-full w-full" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label
        htmlFor={id}
        className="text-sm ml-3 text-light-slate-12 font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;

