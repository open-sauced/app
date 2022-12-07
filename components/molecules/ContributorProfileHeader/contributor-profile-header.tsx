import Avatar from "components/atoms/Avatar/avatar";
import { StaticImageData } from "next/image";
import React from "react";

interface ContributorProfileHeaderProps {
  avatarUrl?: StaticImageData | string;
}
const ContributorProfileHeader = ({ avatarUrl }: ContributorProfileHeaderProps) => {
  return (
    <div className="w-full flex items-end px-14 bg-[#DFE3E6] h-[216px]">
      <div className="translate-y-[90px]">
        <Avatar hasBorder avatarURL={avatarUrl} size={184} isCircle />
      </div>
    </div>
  );
};

export default ContributorProfileHeader;
