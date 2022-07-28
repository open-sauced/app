import React from "react";
import Image, { StaticImageData } from "next/image";

interface IconProps {
    IconImage: StaticImageData;
    className?: string;
    alt?: string;
    size?: number;
}

const Icon: React.FC<IconProps> = ({ className, IconImage, alt, size = 16 }) => {
  return (
    <div className={`${className && className} inline-flex`}>
      <Image
        className="items-center justify-center"
        alt={alt ? alt : "Icon"} width={size} height={size} src={IconImage} />
    </div>
  );
};

export default Icon;