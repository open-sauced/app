import React from "react";
import Text from "components/atoms/Typography/text";
import Image from "next/image";
import openSaucedImg from "../../../public/openSauced-icon.png";
import openSaucedImgWithBg from "../../../public/open-sourced-with-bg-icon.png";

interface HeaderLogoProps {
  loginScreen?: boolean;
  withBg: boolean;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ loginScreen, withBg = false }) => {
  
  return (
    <div className="flex items-center p-2">
      <Image
        className="rounded"
        alt="Open Sauced Logo"
        width={32}
        height={32}
        src={withBg ? openSaucedImgWithBg : openSaucedImg}
      />
      <Text
        className={`font-semibold px-2 text-base hidden xs:block ${loginScreen ? "!text-black" : "!text-white"}`}
      >
          OpenSauced
      </Text>
    </div>
  );



};

export default HeaderLogo;
