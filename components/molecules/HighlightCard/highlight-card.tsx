import React from "react";
import Image from "next/image";
import repoIcon from "../../../public/icons/icon-repo--blue.svg";
import prIcon from "../../../public/icons/icon-pr--green.svg";
import labelIcon from "../../../public/icons/icon-label--blue.svg";
import thumbsIcon from "../../../public/icons/icon-thumbs-down--yellow.svg";
import metricArrow from "../../../public/icons/metric-arrow.svg";

interface HighlightCardProps {
    className?: string;
    label?: string;
    icon?: "participation" | "accepted-pr" | "unlabeled-pr" | "spam";
    metricIncreases: boolean;
    increased?: boolean;
    numChanged?: number;
    percentage?: number;
    percentageLabel?: string;
}

// TO-DO:
// Replace these icons, or make them dynamic.
// Maybe create an Icon component.
const icons = {
  participation: {
    src: repoIcon.src,
    label: "Participation"
  },
  acceptedPR: {
    src: prIcon.src,
    label: "Accepted PRs"
  },
  unlabeledPR: {
    src: labelIcon.src,
    label: "Unlabeled PRs"
  },
  spam: {
    src: thumbsIcon.src,
    label: "Spam"
  }
};

const HighlightCard: React.FC<HighlightCardProps> = ({ className, label, icon, metricIncreases, increased, numChanged, percentage, percentageLabel }) => {
  return (
    <div className={`${className && className} flex flex-col bg-white border border-slate-300 rounded-lg min-w-[316px] max-w-md h-auto p-2`}>
      {/* Top Information */}
      <div className="flex justify-between w-full p-1">
        {/* Label */}
        <div className="flex items-center gap-2">
          {/* Label: Icon */}
          <div className={`w-8 h-8 flex justify-center items-center ${icon === "participation" ? "bg-blue-100" : icon === "accepted-pr" ? "bg-green-100" : icon === "unlabeled-pr" ? "bg-cyan-100" : icon === "spam" ? "bg-orange-100" : "bg-slate-100"} rounded-full`}>
            <Image 
              width={16} height={16}
              alt={icon === "participation" ? icons.participation.label : icon === "accepted-pr" ? icons.acceptedPR.label : icon === "unlabeled-pr" ? icons.unlabeledPR.label : icon === "spam" ? icons.spam.label : "Icon"} 
              src={icon === "participation" ? icons.participation.src : icon === "accepted-pr" ? icons.acceptedPR.src : icon === "unlabeled-pr" ? icons.unlabeledPR.src : icon === "spam" ? icons.spam.src : "Icon"} />
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
        <div className={`flex items-center w-full rounded-full mt-7 ${(percentage && (percentage > 0 || percentage < 99)) ? "gap-2" : ""}`}>
          <div className={`${metricIncreases ? (percentage && percentage > 70 ? "bg-green-500" : percentage && percentage > 30 ? "bg-yellow-500" : "bg-red-500") : (percentage && percentage > 70 ? "bg-red-500" : percentage && percentage > 30 ? "bg-yellow-500" : "bg-green-500")} h-3 rounded-full`}
            style={{width: (percentage ? percentage : 0) + "%"}}></div>
            
          <div className="bg-gray-200 w-auto flex-auto h-3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HighlightCard;