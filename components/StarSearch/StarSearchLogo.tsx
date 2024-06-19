import clsx from "clsx";
import Image from "next/image";

interface StarSearchLogoProps {
  size?: "small" | "regular";
}

export const StarSearchLogo = ({ size = "regular" }: StarSearchLogoProps) => {
  const sizeInPx = size === "small" ? 16 : 24;

  return (
    <div
      className={clsx(
        "rounded-full bg-gradient-to-br from-sauced-orange to-amber-400 w-max",
        size === "small" ? "p-1" : "p-2"
      )}
    >
      <Image
        src="/assets/star-search-logo-white.svg"
        alt="StarSearch logo"
        width={sizeInPx}
        height={sizeInPx}
        className={size === "small" ? "w-4 h-4" : "w-6 h-6"}
      />
    </div>
  );
};
