import React from "react";
import Image, { StaticImageData } from "next/image";
import AvatarImage from "../../../public/hacktoberfest-icon.png";

interface AvatarProps {
    className?: string;
    customTailwindStyles?: string;
    avatarURL?: string | StaticImageData;
    alt?: string;
    size?: number;
    hasBorder?: boolean;
}

const avatarLoader = () => {
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
};

const Avatar: React.FC<AvatarProps> = ({ className, customTailwindStyles, avatarURL, alt, size, hasBorder }) => {

  return (
    <Image 
      className={`${className && className} ${customTailwindStyles && customTailwindStyles} rounded-full object-cover ${hasBorder ? "border border-white" : ""}`}
      alt={alt ? alt : "Avatar"} width={!size ? 32 : size} height={!size ? 32 : size} loader={avatarLoader} src={avatarURL ? avatarURL : AvatarImage} />
  );
};

export default Avatar;