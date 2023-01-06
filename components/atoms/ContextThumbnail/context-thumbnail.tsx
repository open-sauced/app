import React from "react";
import Image, { StaticImageData } from "next/legacy/image";
import ContextThumbnailImage from "../../../img/open-sourced-with-bg-icon.png";

interface ContextThumbnailProps {
    className?: string;
    ContextThumbnailURL?: string | StaticImageData;
    alt?: string;
    size?: string | number;
}

const ContextThumbnail: React.FC<ContextThumbnailProps> = ({ className, ContextThumbnailURL, alt, size }) => {
  return (
    <Image
      className={`${className ? className : ""} rounded-lg border-1 border-slate-100 object-cover`}
      alt={alt ? alt : "ContextThumbnail"} width={size as number} height={size as number} src={ContextThumbnailURL ? ContextThumbnailURL : ContextThumbnailImage} />
  );
};

export default ContextThumbnail;
