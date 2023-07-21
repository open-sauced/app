import React from "react";
import Image from "next/image";

import { BsFillCheckCircleFill } from "react-icons/bs";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";
import hashIcon from "../../../img/icons/hash.svg";
import orgIcon from "../../../img/icons/org.svg";
import personIcon from "../../../img/icons/person.svg";
import repoIcon from "../../../img/icons/repo.svg";

interface FilterCardSelectProps {
  selected: string;
  icon?: "topic" | "repo" | "org" | "contributor";
  options: string[];
  handleFilterClick: (filter: string) => void;
}

const icons = {
  topic: {
    src: hashIcon.src,
    alt: "Topic",
  },
  org: {
    src: orgIcon.src,
    alt: "Organization",
  },
  contributor: {
    src: personIcon.src,
    alt: "Contributor",
  },
  repo: {
    src: repoIcon.src,
    alt: "Repository",
  },
};

const FilterCardSelect: React.FC<FilterCardSelectProps> = ({
  selected: filterName,
  icon = "topic",
  options,
  handleFilterClick,
}) => {
  return (
    <Select onValueChange={(value) => handleFilterClick(value)} value={filterName}>
      <SelectTrigger
        selectIcon={
          <Image
            className="ml-3 "
            width={13}
            height={13}
            alt={icons[icon] ? icons[icon].alt : "Icons"}
            src={icons[icon] ? icons[icon].src : icons.topic.src}
          />
        }
        className="text-base rounded-lg cursor-pointer h-[1.95rem] w-max border-slate-300 hover:bg-slate-50 focus:ring-1 bg-slate-100 focus:ring-slate-300"
      >
        <SelectValue placeholder="select topic" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {options.map((option, index) => (
          <SelectItem
            className="w-48 text-base"
            itemIndicatorIcon={<BsFillCheckCircleFill className="!text-base text-light-orange-10" />}
            key={index}
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterCardSelect;
