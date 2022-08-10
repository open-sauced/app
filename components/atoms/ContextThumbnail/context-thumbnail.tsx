import React from "react";
import Image, { StaticImageData } from "next/image";
import ContextThumbnailImage from "../../../public/hacktoberfest-icon.png";

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
      alt={alt ? alt : "ContextThumbnail"} width={size} height={size} src={ContextThumbnailURL ? ContextThumbnailURL : ContextThumbnailImage} />
  );
};

export default ContextThumbnail;