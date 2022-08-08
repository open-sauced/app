import React from "react";
import Image from "next/image";
import Text from "../Typography/text";
import hashIcon from "../../../public/icons/hash.svg";
import orgIcon from "../../../public/icons/org.svg";
import personIcon from "../../../public/icons/person.svg";
import repoIcon from "../../../public/icons/repo.svg";
import cancelIcon from "../../../public/x-circle.svg";

interface FilterCardProps {
    filterName: string;
    bgColor?: string;
    isRemovable?: boolean;
    icon?: "topic" | "repo" | "org" | "contributor";
}

const icons = {
  topic: {
    src: hashIcon.src,
    alt: "Topic"
  },
  org: {
    src: orgIcon.src,
    alt: "Organization"
  },
  contributor: {
    src: personIcon.src,
    alt: "Contributor"
  },
  repo: {
    src: repoIcon.src,
    alt: "Repository"
  }
};

const FilterCard: React.FC<FilterCardProps> = ({ filterName, bgColor, icon, isRemovable }) => {
  return (
    <div
      className={`inline-block py-1 px-2 border border-slate-300 outline-none hover:bg-slate-50 focus:ring-2 ${bgColor && `bg-${bgColor}`} ${isRemovable ? "focus:ring-orange-500" : "bg-slate-100 focus:ring-slate-300" } rounded-lg`}>
      <div className="flex items-center gap-1">
        <Image 
          width={14} height={14}
          alt={icon === "topic" ? icons.topic.alt : icon === "org" ? icons.org.alt : icon === "contributor" ? icons.contributor.alt : icon === "repo" ? icons.repo.alt : "Icon"} 
          src={icon === "topic" ? icons.topic.src : icon === "org" ? icons.org.src : icon === "contributor" ? icons.contributor.src : icon === "repo" ? icons.repo.src : icons.topic.src} />
        <Text className="!text-sm font-semibold tracking-tight !text-slate-900">
          {filterName}
        </Text>
        { isRemovable ? 
          <Image alt="Cancel Icon" src={cancelIcon} />
          :
          false
        }
      </div>
    </div>
  );
};

export default FilterCard;