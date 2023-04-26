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
>(({ className, label, id, ...props }, ref) => (
  <div className="flex items-center">
    <CheckboxPrimitive.Root
      ref={ref}
      className={clsx(
        "peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary",
        className
      )}
      {...props}
      id={id}
    >
      <CheckboxPrimitive.Indicator
        className={clsx("flex items-center justify-center text-primary")}
      >
        <FiCheck className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    )}
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;

