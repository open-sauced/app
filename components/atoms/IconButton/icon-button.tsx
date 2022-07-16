import React from "react";
import Image, { StaticImageData } from "next/image";
import SettingsIcon from "../../../public/settings-icon.svg";

interface IconButtonProps {
    IconButtonImage?: StaticImageData;
    className?: string;
    alt?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ className, IconButtonImage = SettingsIcon, alt }) => {
  return (
    <div className={`${className && className} flex h-6 w-6 rounded border-1 bg-light-slate-3 border-[1px] border-light-slate-6 items-center justify-center`}>
      <Image
        className="items-center justify-center"
        alt={alt ? alt : "IconButton"} width={16} height={16} src={IconButtonImage} />
    </div>
  );
};

export default IconButton;