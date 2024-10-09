import clsx from "clsx";
import React from "react";

interface IconProps {
  IconImage: string;
  className?: string;
  alt?: string;
  size?: number;
  onClick?: (...args: any) => any;
}

const SVGIcon: React.FC<IconProps> = ({ onClick, className, IconImage, size = 16 }) => {
  return (
    <svg
      className={clsx(`inline-flex`, className)}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
    >
      <use
        href={IconImage}
        width={size}
        height={size}
        className="items-center justify-center"
        style={{ stroke: "currentcolor", maxWidth: "100%", height: "auto" }}
      />
    </svg>
  );
};

export default SVGIcon;
