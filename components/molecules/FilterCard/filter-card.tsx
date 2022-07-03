import React from "react";
import { Typography } from "@supabase/ui"
import Image from "next/image"
import hashtag from "../../../public/Icon.svg";
import orgIcon from "../../../public/bookmark-alt.svg";
import cancelIcon from "../../../public/x-circle.svg";

interface FilterCardProps {
    filterName: string;
    bgColor?: string;
    hashtagIcon?: boolean;
}

const FilterCard: React.FC<FilterCardProps> = ({ filterName, bgColor, hashtagIcon }) => {
    const { Text } = Typography;
    return (
        <div className={`mr-3 py-[7px] px-2 border border-[#C5C5C5] ${bgColor && `bg-${bgColor}`} rounded-lg`}>
            { hashtagIcon ?
                <Text strong>
                    <Image alt="Hashtag Icon" src={hashtag} /> {filterName}
                </Text>
                :
                <Text className="flex items-center pt-[3px]" strong>
                    <div className="flex items-end pr-1">
                        <Image alt="Organization Icon" src={orgIcon} />
                    </div>
                    {filterName}
                    <div className="flex items-end pl-1">
                        <Image alt="Cancel Icon" src={cancelIcon} />
                    </div>
                </Text>
            }
        </div>
    )
};

export default FilterCard;