import React, { ComponentProps } from "react";
import clsx from "clsx";

interface DashContainerProps extends ComponentProps<"div"> {
  children: React.ReactNode;
}
const DashContainer = ({ children, className, ...props }: DashContainerProps) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center px-6 py-20 border border-dashed rounded-xl border-light-slate-8 lg:px-32",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DashContainer;
