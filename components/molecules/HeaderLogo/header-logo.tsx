import React from "react";
import Image from "next/image";
import Link from "next/link";
import openSaucedImg from "../../../img/logo-slice-gradient.svg";
import openSaucedImgWithBg from "../../../img/open-sourced-with-bg-icon.png";

interface HeaderLogoProps {
  textIsBlack?: boolean;
  withBg: boolean;
  responsive?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ textIsBlack, withBg = false, responsive }) => {
  return (
    <Link href="/" className="flex items-center py-2 gap-2 cursor-pointer">
      <Image className="rounded" alt="" width={20} src={withBg ? openSaucedImgWithBg : openSaucedImg} />
      <span
        className={`font-bold text-lg tracking-tight ${textIsBlack ? "!text-black" : "!text-white"} ${
          responsive ? "hidden sm:block" : ""
        }`}
      >
        OpenSauced
      </span>
    </Link>
  );
};

export default HeaderLogo;
