/* eslint-disable prettier/prettier */
import React from "react";
import clsx from "clsx";

import TypographyWrapper from "./wrapper";

interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  weight?: "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, level = 1, weight = "medium", className, ...props }) => {
  const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <TypographyWrapper>
      <TitleTag className={clsx(className, `font-${weight}`)} {...props}>
        {children}
      </TitleTag>
    </TypographyWrapper>
  );
};

export default Title;
