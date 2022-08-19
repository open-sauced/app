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
  if (withBg)
    return (
      <div className="flex items-center p-2">
        <Image className="rounded" alt="Open Sauced Logo" width={32} height={32} src={openSaucedImgWithBg} />
        <Text
          className={`font-semibold px-2 text-[16px] hidden xs:block ${loginScreen ? "!text-black" : "!text-white"}`}
        >
          OpenSauced
        </Text>
      </div>
    );
  return (
    <div className="flex items-center p-2">
      <Image className="rounded" alt="Open Sauced Logo" width={32} height={32} src={openSaucedImg} />
      <Text className={`font-semibold px-2 text-[16px] hidden xs:block ${loginScreen ? "!text-black" : "!text-white"}`}>
        OpenSauced
      </Text>
    </div>
  );


};

export default HeaderLogo;
