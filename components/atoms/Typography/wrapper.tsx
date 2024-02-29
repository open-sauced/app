import React from "react";
import clsx from "clsx";

interface TypographyWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const TypographyWrapper: React.FC<TypographyWrapperProps> = ({ children, className, size = "sm", ...props }) => {
  return (
    <div className={clsx("prose", `prose-${size}`, "dark:prose-invert", className)} {...props}>
      {children}
    </div>
  );
};

export default TypographyWrapper;
