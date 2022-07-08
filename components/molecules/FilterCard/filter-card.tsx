import React from "react";
import Image from "next/image";
import StrongText from "../../atoms/Typography/strong-text";
import hashtag from "../../../public/Icon.svg";
import orgIcon from "../../../public/bookmark-alt.svg";
import cancelIcon from "../../../public/x-circle.svg";

interface FilterCardProps {
    filterName: string;
    bgColor?: string;
    hashtagIcon?: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ filterName, bgColor, hashtagIcon }) => {
  return (
    <div className={`mr-3 py-1 px-2 py-0.5 border border-slate-300 ${bgColor && `bg-${bgColor}`} rounded-lg`}>
      { hashtagIcon ?
        <StrongText>
          <Image alt="Hashtag Icon" src={hashtag} /> {filterName}
        </StrongText>
        :
        <StrongText customTailWindProps="flex items-center pt-[3px]">
          <div className="flex items-end pr-1">
            <Image alt="Organization Icon" src={orgIcon} />
          </div>
          {filterName}
          <div className="flex items-end pl-1">
            <Image alt="Cancel Icon" src={cancelIcon} />
          </div>
        </StrongText>
      }
    </div>
  );
};

export default FilterCard;