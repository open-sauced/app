import React from "react";
import Image from "next/image";
import Link from "next/link";
import openSaucedImg from "../../../img/logo-slice-gradient.svg";

interface HeaderLogoProps {
  textIsBlack?: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ textIsBlack }) => {
  return (
    <Link href="/" className="flex items-center py-2 gap-2 cursor-pointer">
      <Image className="rounded" alt="" width={20} src={openSaucedImg} />
      <span
        className={`font-bold text-lg tracking-tight ${textIsBlack ? "text-black" : "text-white"} hidden md:inline`}
      >
        OpenSauced
      </span>
    </Link>
  );
};

export default HeaderLogo;
