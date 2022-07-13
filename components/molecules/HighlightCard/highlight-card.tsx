import React from "react";
import Image from "next/image";
import Text from "../../atoms/Typography/text";
import hashIcon from "../../../public/icons/hash.svg";
import orgIcon from "../../../public/icons/org.svg";
import personIcon from "../../../public/icons/person.svg";
import repoIcon from "../../../public/icons/repo.svg";
import cancelIcon from "../../../public/x-circle.svg";

interface HighlightCardProps {
    label?: string;
    color?: string;
    icon?: "topic" | "repo" | "org" | "contributor";
    metric?: "decreases" | "increases";
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

const HighlightCard: React.FC<HighlightCardProps> = ({ label, color, icon, metric }) => {
  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg max-w-md h-auto p-2">
      {/* Top Information */}
      <div className="flex justify-between w-full p-2">
        {/* Label */}
        <div className="flex items-center gap-2">
          {/* Label: Icon */}
          <div className="w-6 h-6 flex justify-center items-center bg-orange-100 rounded-full">
            <Image 
              width={12} height={12}
              alt={icon === "topic" ? icons.topic.alt : icon === "org" ? icons.org.alt : icon === "contributor" ? icons.contributor.alt : icon === "repo" ? icons.repo.alt : "Icon"} 
              src={icon === "topic" ? icons.topic.src : icon === "org" ? icons.org.src : icon === "contributor" ? icons.contributor.src : icon === "repo" ? icons.repo.src : icons.topic.src} />
          </div>
          {/* Label: Text */}
          <div className="text-sm text-slate-600 font-medium leading-none">
            { label }
          </div>
        </div>

        {/* Last Updated Information */}
        <div className="flex items-center gap-1">
          {/* Last Updated: Number */}
          <div className="text-sm text-slate-600 font-medium leading-none">
            98
          </div>
          {/* Last Updated: Icon */}
          <div>
            <Image 
              width={12} height={12}
              alt={icon === "topic" ? icons.topic.alt : icon === "org" ? icons.org.alt : icon === "contributor" ? icons.contributor.alt : icon === "repo" ? icons.repo.alt : "Icon"} 
              src={icon === "topic" ? icons.topic.src : icon === "org" ? icons.org.src : icon === "contributor" ? icons.contributor.src : icon === "repo" ? icons.repo.src : icons.topic.src} />
          </div>
        </div>
      </div>

      {/* Main Information */}
      <div>
        {/* Main Number */}
        <div>
          {/* Percentage */}
          <div></div>
          
          {/* Label */}
          <div></div>
        </div>

        {/* Progress Bar */}
        <div></div>
      </div>
    </div>
  );
};

export default HighlightCard;