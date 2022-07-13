import React from "react";
import Image from "next/image";
import Text from "../../atoms/Typography/text";
import hashIcon from "../../../public/icons/hash.svg";
import orgIcon from "../../../public/icons/org.svg";
import personIcon from "../../../public/icons/person.svg";
import repoIcon from "../../../public/icons/repo.svg";
import cancelIcon from "../../../public/x-circle.svg";
import metricArrow from "../../../public/icons/metric-arrow.svg";

interface HighlightCardProps {
    label?: string;
    color?: string;
    icon?: "topic" | "repo" | "org" | "contributor";
    metric?: "decreases" | "increases";
    increased?: boolean;
    numChanged?: number;
    percentage?: number;
    percentageLabel?: string;
}

// TO-DO:
// Replace these icons, or make them dynamic.
// Maybe create an Icon component.
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

const HighlightCard: React.FC<HighlightCardProps> = ({ label, color, icon, metric, increased, numChanged, percentage, percentageLabel }) => {
  return (
    <div className="flex flex-col bg-white border border-slate-300 rounded-lg max-w-md h-auto p-2">
      {/* Top Information */}
      <div className="flex justify-between w-full p-1">
        {/* Label */}
        <div className="flex items-center gap-2">
          {/* Label: Icon */}
          <div className="w-8 h-8 flex justify-center items-center bg-orange-100 rounded-full">
            <Image 
              width={16} height={16}
              alt={icon === "topic" ? icons.topic.alt : icon === "org" ? icons.org.alt : icon === "contributor" ? icons.contributor.alt : icon === "repo" ? icons.repo.alt : "Icon"} 
              src={icon === "topic" ? icons.topic.src : icon === "org" ? icons.org.src : icon === "contributor" ? icons.contributor.src : icon === "repo" ? icons.repo.src : icons.topic.src} />
          </div>
          {/* Label: Text */}
          <div className="text-sm text-slate-600 font-medium leading-none">
            { label ? label : "Label" }
          </div>
        </div>

        {/* Last Updated Information */}
        <div className="flex items-center gap-1">
          {/* Last Updated: Number */}
          <div className="text-sm text-slate-600 font-medium leading-none">
            { numChanged ? numChanged : 0 } 
          </div>
          {/* Last Updated: Icon */}
          <Image 
            width={14} height={14}
            alt={(increased ? "Increased " : "Decreased ") + label + " by" + numChanged} 
            src={metricArrow.src} 
            className={`${increased ? "" : "rotate-180"}`} />
        </div>
      </div>

      {/* Main Information */}
      <div className="flex flex-col w-full px-6 pb-5 mt-2">
        {/* Main Number */}
        <div className="flex flex-col items-center">
          {/* Percentage */}
          <div className="text-4xl font-normal">
            { percentage ? percentage : 0 }%
          </div>
          
          {/* Label */}
          <div className="text-base font-medium text-slate-600 mt-0.5">
            { percentageLabel ? percentageLabel : "Label"}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center w-full rounded-full mt-7 gap-1">
          <div className="bg-blue-600 h-3 rounded-full" 
            style={{width: (percentage ? percentage : 28) + "%"}}></div>
            
          <div className="bg-gray-200 w-auto flex-auto h-3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;