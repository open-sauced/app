import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Text from "../../atoms/Typography/text";
import hashIcon from "../../../img/icons/hash.svg";
import orgIcon from "../../../img/icons/org.svg";
import personIcon from "../../../img/icons/person.svg";
import repoIcon from "../../../img/icons/repo.svg";
import Selector from "../../atoms/Selector/selector";

interface FilterCardSelectProps {
    selected: string;
    icon?: "topic" | "repo" | "org" | "contributor";
    options: string[];
    handleFilterClick: (filter: string) => void;
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

const FilterCardSelect: React.FC<FilterCardSelectProps> = ({ selected: filterName, icon = "topic", options, handleFilterClick }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={toggleFilter}
        ref={ref}
        className={"inline-block py-1 border border-slate-300 outline-none hover:bg-slate-50 focus:ring-2 bg-slate-100 focus:ring-slate-300 rounded-lg cursor-pointer"}>
        <button className="flex items-center gap-1 mx-2">
          <Image
            width={14} height={14}
            alt={icon === "topic" ? icons.topic.alt : icon === "org" ? icons.org.alt : icon === "contributor" ? icons.contributor.alt : icon === "repo" ? icons.repo.alt : "Icon"}
            src={icon === "topic" ? icons.topic.src : icon === "org" ? icons.org.src : icon === "contributor" ? icons.contributor.src : icon === "repo" ? icons.repo.src : icons.topic.src} />
          <Text className="!text-sm font-semibold tracking-tight !text-slate-900">
            {filterName}
          </Text>
        </button>
        { isOpen && <Selector
          filterOptions={options}
          handleFilterClick={handleFilterClick}
          selected={filterName}
        />
        }
      </div>
    </>
  );
};

export default FilterCardSelect;
