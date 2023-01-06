import React from "react";
import Text from "components/atoms/Typography/text";
import Image from "next/legacy/image";
import openSaucedImg from "../../../img/openSauced-icon.png";
import openSaucedImgWithBg from "../../../img/open-sourced-with-bg-icon.png";
import Link from "next/link";

interface HeaderLogoProps {
  textIsBlack?: boolean;
  withBg: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ textIsBlack, withBg = false }) => {
  return (
    <Link href="/">
      <div className="flex items-center py-2 gap-2 cursor-pointer">
        <Image
          className="rounded"
          alt="Open Sauced Logo"
          width={32}
          height={32}
          src={withBg ? openSaucedImgWithBg : openSaucedImg}
        />
        <p className={`font-bold !text-base hidden xs:block ${textIsBlack ? "!text-black" : "!text-white"}`}>
          OpenSauced
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
