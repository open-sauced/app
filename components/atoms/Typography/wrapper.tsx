import React from "react";
import clsx from "clsx";

interface TypographyWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "base" | "lg" | "xl" | "xxl";
}

const TypographyWrapper: React.FC<TypographyWrapperProps> = ({ children, className, size = "sm", ...props }) => {
  return (
    <span className={clsx("prose", size !== "xxl" ? `prose-${size}` : "prose-2xl", className)} {...props}>
      {children}
    </span>
  );
};

export default TypographyWrapper;
