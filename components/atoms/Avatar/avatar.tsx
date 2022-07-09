import React from "react";
import Image, { StaticImageData } from "next/image";
import AvatarImage from "../../../public/hacktoberfest-icon.png";

interface AvatarProps {
    className?: string;
    customTailwindStyles?: string;
    avatarURL?: string | StaticImageData;
    alt?: string;
    size?: string | number;
}

const avatarLoader = () => {
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
};

const Avatar: React.FC<AvatarProps> = ({ className, customTailwindStyles, avatarURL, alt, size }) => {
  return (
    <Image 
      className={`${className && className} ${customTailwindStyles && customTailwindStyles} rounded-full object-cover`}
      alt={alt ? alt : "Avatar"} width={size} height={size} loader={avatarLoader} src={avatarURL ? avatarURL : AvatarImage} />
  );
};

export default Avatar;