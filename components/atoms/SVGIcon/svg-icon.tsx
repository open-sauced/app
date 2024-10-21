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
    <button onClick={onClick}>
      <svg className={clsx(`inline-flex`, className)}>
        <use
          href={IconImage}
          width={size}
          height={size}
          className="items-center justify-center"
          style={{ stroke: "currentcolor", maxWidth: "100%", height: "auto" }}
        />
      </svg>
    </button>
  );
};

export default SVGIcon;
