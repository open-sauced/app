import React from "react";
import Image, { StaticImageData } from "next/image";
import SettingsIcon from "../../../public/settings-icon.svg";

interface IconProps {
    IconImage: StaticImageData;
    className?: string;
    customTailwindStyles?: string;
    alt?: string;
}

const Icon: React.FC<IconProps> = ({ className, customTailwindStyles, IconImage, alt }) => {
  return (
    <div className={`${className && className} ${customTailwindStyles && customTailwindStyles}`}>
      <Image
        className="items-center justify-center"
        alt={alt ? alt : "Icon"} width={16} height={16} src={IconImage} />
    </div>
  );
};

export default Icon;