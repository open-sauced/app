import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FiCheck } from "react-icons/fi";

import clsx from "clsx";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    id = id ? id : label?.replaceAll(" ", "_").toLowerCase();
    return (
      <div className="flex items-center">
        <CheckboxPrimitive.Root
          ref={ref}
          className={clsx(
            "peer h-4 w-4 shrink-0 rounded-[4px] cursor-pointer bg-white border border-light-slate-8 hover:border-orange-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500",
            className
          )}
          {...props}
          id={id}
        >
          <CheckboxPrimitive.Indicator className={clsx("flex items-center justify-center text-white")}>
            <FiCheck className="w-full h-full" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label
            htmlFor={id}
            className="ml-3 text-sm font-medium leading-none cursor-pointer text-light-slate-12 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
