import React from "react";
import Image, { StaticImageData } from "next/image";

interface IconProps {
    IconImage: StaticImageData;
    className?: string;
    alt?: string;
}

const Icon: React.FC<IconProps> = ({ className, IconImage, alt }) => {
  return (
    <div className={`${className && className}`}>
      <Image
        className="items-center justify-center"
        alt={alt ? alt : "Icon"} width={16} height={16} src={IconImage} />
    </div>
  );
};

export default Icon;