import React from "react";
import Image, { StaticImageData } from "next/image";
import AvatarImage from "../../../img/hacktoberfest-icon.png";
import cachedImage from "lib/utils/cachedImages";

interface AvatarProps {
  className?: string;
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
  size?: "sm" | "base" | "lg" | number;
  hasBorder?: boolean;
  isCircle?: boolean;
  isCached?: boolean;
}

const avatarLoader = () => {
  return "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";
};

const Avatar = (props: AvatarProps): JSX.Element => {
  const imageSource =
    props.avatarURL && props.isCached
      ? cachedImage(props.avatarURL as string, process.env.NEXT_PUBLIC_CLOUD_NAME)
      : props.avatarURL;

  switch (typeof props.size) {
  case "string":
    return <DefaultAvatar {...props} avatarURL={imageSource} />;
  case "number":
    return <CustomAvatar {...props} />;

  default:
    return <span>invalid avatar size props!!!</span>;
  }
};

export default Avatar;

const CustomAvatar = ({ className, avatarURL, initials, alt, size, hasBorder, isCircle }: AvatarProps): JSX.Element => {
  return (
    <div
      className={`inline-flex ${
        avatarURL ? "" : "bg-orange-500"
      } justify-center relative items-center w-max h-max overflow-hidden
        ${className ?? " "}
        ${isCircle ? "rounded-full " : "rounded-lg "}
        ${hasBorder ? "ring-2 ring-slate-200 " : ""}
      `}
    >
      {avatarURL ? (
        <Image
          className={`${className ? className : ""} object-cover`}
          alt={alt ? alt : "Avatar"}
          width={size as number}
          height={size as number}
          src={avatarURL ? avatarURL : AvatarImage}
        />
      ) : (
        <div
          className={`flex items-center justify-center font-bold leading-none text-slate-50 mb-0.25 text-${size}`}
          style={{ width: size, height: size }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

const DefaultAvatar = ({
  className,
  avatarURL,
  initials,
  alt,
  size,
  hasBorder,
  isCircle
}: AvatarProps): JSX.Element => {
  return (
    <div
      className={`inline-flex ${avatarURL ? "" : "bg-orange-500"} justify-center relative items-center overflow-hidden
        ${isCircle ? "rounded-full " : "rounded-lg "}
        ${hasBorder ? "ring-2 ring-slate-200 " : ""}
        ${size === "sm" ? "w-6 h-6 " : size === "base" ? "w-8 h-8 " : size === "lg" ? "w-12 h-12 " : "w-8 h-8 "}
      `}
    >
      {avatarURL ? (
        <Image
          className={`${className ? className : ""} object-cover`}
          alt={alt ? alt : "Avatar"}
          fill={true}
          src={avatarURL ? avatarURL : AvatarImage}
        />
      ) : (
        <div
          className={`flex items-center justify-center font-bold leading-none text-slate-50 mb-0.25 ${
            size === "sm" ? "text-xs" : size === "base" ? "text-sm" : size === "lg" ? "text-lg" : "text-sm"
          }`}
          style={{ width: size, height: size }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
