import React from "react";
import clsx from "clsx";

interface TypographyWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg" | "xl" | "2xl";
}

const TypographyWrapper: React.FC<TypographyWrapperProps> = ({ children, className, size = "sm", ...props }) => {
  return (
    <span className={clsx("prose", `prose-${size}`, className)} {...props}>
      {children}
    </span>
  );
};

export default TypographyWrapper;
