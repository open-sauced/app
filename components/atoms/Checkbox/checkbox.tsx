import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FiCheck } from "react-icons/fi";

import clsx from "clsx";

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const getId = () => (id ? id : label?.replace(/\s+/g, "-").toLowerCase());

    const checkboxClasses = clsx(
      "group h-4 w-4 rounded cursor-pointer bg-white border border-light-slate-8 hover:border-orange-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      {
        "border-orange-500 bg-orange-500": props.checked,
      },
      className
    );

    const labelClasses = clsx("ml-3 text-sm font-medium leading-none cursor-pointer text-light-slate-12", {
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70": props.disabled,
    });

    return (
      <div className="flex items-center">
        <CheckboxPrimitive.Root ref={ref} className={checkboxClasses} {...props} id={getId()}>
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
            <FiCheck className="w-full h-full" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label && (
          <label htmlFor={getId()} className={labelClasses}>
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default Checkbox;
