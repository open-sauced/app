import Image from "next/image";

interface StarSearchLogoProps {
  size?: "small" | "regular";
}

export const StarSearchLogo = ({ size = "regular" }: StarSearchLogoProps) => {
  let sizeInPx = 20;

  if (size === "small") {
    sizeInPx = 16;
  }

  return (
    <div className="p-2 rounded-full bg-gradient-to-br from-sauced-orange to-amber-400 w-max">
      <Image
        src="/assets/star-search-logo-white.svg"
        alt="StarSearch logo"
        width={sizeInPx}
        height={sizeInPx}
        className={size === "small" ? "w-4 h-4" : "w-5 h-5"}
      />
    </div>
  );
};
