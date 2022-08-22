import React from "react";
import Image, { StaticImageData } from "next/image";
import AvatarImage from "../../../public/hacktoberfest-icon.png";
import { number } from "echarts";

interface AvatarProps {
  className?: string;
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
  size?: "sm" | "base" | "lg" | number;
  hasBorder?: boolean;
}

const avatarLoader = () => {
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
};

const Avatar: React.FC<AvatarProps> = ({ className, avatarURL, initials, alt, size, hasBorder }) => {
  return (
    <div
      className={`inline-flex bg-orange-500 justify-center relative items-center rounded-full overflow-hidden ${
        hasBorder ? "ring-2 ring-slate-200" : ""
      } ${
        size === "sm"
          ? `w-6 h-6`
          : size === "base"
          ? `w-8 h-8`
          : size === "lg"
          ? `w-12 h-12`
          : typeof size === "number"
          ? `w-${size} h-${size}`
          : "w-8 h-8"
      }`}
    >
      {avatarURL ? (
        <Image
          className={`${className ? className : ""} object-cover`}
          alt={alt ? alt : "Avatar"}
          layout="fill"
          // width={size === "sm" ? 16 : size === "base" ? 32 : size === "lg" ? 48 : 32}
          // height={size === "sm" ? 16 : size === "base" ? 32 : size === "lg" ? 48 : 32}
          /* loader={avatarLoader} */ src={avatarURL ? avatarURL : AvatarImage}
        />
      ) : (
        <div
          className={`font-bold leading-none text-slate-50 mb-0.25 ${
            size === "sm" ? "text-xs" : size === "base" ? "text-sm" : size === "lg" ? "text-lg" : "text-sm"
          }`}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
