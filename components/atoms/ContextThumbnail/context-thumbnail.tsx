import React from "react";
import Image, { StaticImageData } from "next/image";
import ContextThumbnailImage from "../../../public/hacktoberfest-icon.png";

interface ContextThumbnailProps {
    className?: string;
    customTailwindStyles?: string;
    ContextThumbnailURL?: string | StaticImageData;
    alt?: string;
    size?: string | number;
}

const ContextThumbnailLoader = () => {
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
};

const ContextThumbnail: React.FC<ContextThumbnailProps> = ({ className, customTailwindStyles, ContextThumbnailURL, alt, size }) => {
  return (
    <Image 
      className={`${className && className} ${customTailwindStyles && customTailwindStyles} rounded-lg border-1 border-slate-100 object-cover`}
      alt={alt ? alt : "ContextThumbnail"} width={size} height={size} loader={ContextThumbnailLoader} src={ContextThumbnailURL ? ContextThumbnailURL : ContextThumbnailImage} />
  );
};

export default ContextThumbnail;