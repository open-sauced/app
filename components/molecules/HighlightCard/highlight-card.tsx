import React from "react";
import Image from "next/image";
import Card from "components/atoms/Card/card";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import repoIcon from "../../../img/icons/icon-repo--blue.svg";
import prIcon from "../../../img/icons/icon-pr--green.svg";
import personIcon from "../../../img/icons/person-icon.svg";
import labelIcon from "../../../img/icons/icon-label--blue.svg";
import thumbsIcon from "../../../img/icons/icon-thumbs-down--yellow.svg";
import metricArrow from "../../../img/icons/metric-arrow.svg";
import StackedAvatar, { Contributor } from "../StackedAvatar/stacked-avatar";

interface HighlightCardProps {
  className?: string;
  label?: string;
  icon?: "participation" | "accepted-pr" | "unlabeled-pr" | "spam" | "contributors";
  metricIncreases: boolean;
  increased?: boolean;
  numChanged?: number | string;
  percentage?: number;
  percentageLabel?: string;
  value?: number | string;
  valueLabel?: string;
  contributors?: Contributor[];
  isLoading?: boolean;
}

// TO-DO:
// Replace these icons, or make them dynamic.
// Maybe create an Icon component.
const icons = {
  contributors: {
    src: personIcon.src,
    label: "Contributors",
    color: "bg-blue-100",
  },
  participation: {
    src: repoIcon.src,
    label: "Participation",
    color: "bg-blue-100",
  },
  "accepted-pr": {
    src: prIcon.src,
    label: "Accepted PRs",
    color: "bg-green-100",
  },
  "unlabeled-pr": {
    src: labelIcon.src,
    label: "Unlabeled PRs",
    color: "bg-cyan-100",
  },
  spam: {
    src: thumbsIcon.src,
    label: "Spam",
    color: "bg-orange-100",
  },
};

const HighlightCard: React.FC<HighlightCardProps> = ({
  className,
  label,
  icon,
  metricIncreases,
  increased,
  numChanged,
  percentage,
  percentageLabel,
  value,
  valueLabel,
  contributors = [],
  isLoading,
}) => {
  return (
    <Card className={`${className ? className : ""} flex flex-col w-full sm:max-w-[calc(50%-(1rem/2))] h-auto `}>
      <>
        {/* Top Information */}
        <div className="flex justify-between w-full p-1">
          {/* Label */}
          <div className="flex items-center gap-2">
            {/* Label: Icon */}
            <div
              className={`w-8 h-8 flex justify-center items-center ${
                icon ? icons[icon].color : "bg-slate-100"
              } rounded-full`}
            >
              <Image
                width={16}
                height={16}
                alt={icon ? icons[icon].label : "Icon"}
                src={icon ? icons[icon].src : "Icon"}
              />
            </div>
            {/* Label: Text */}
            <div className="text-sm text-slate-600   leading-none">{label ? label : "Label"}</div>
          </div>

          {/* Last Updated Information */}
          <div className="flex items-center gap-1">
            {/* Last Updated: Number */}
            <div className="text-sm text-slate-600   leading-none">{numChanged ? numChanged : 0}</div>
            {/* Last Updated: Icon */}
            <Image
              width={14}
              height={14}
              alt={(increased ? "Increased " : "Decreased ") + label + " by" + numChanged}
              src={metricArrow.src}
              className={`${increased ? "" : "rotate-180"}`}
            />
          </div>
        </div>

        {/* Main Information */}
        {isLoading ? (
          <SkeletonWrapper height={79} count={2} />
        ) : (
          <div className="flex flex-col w-full px-6 pb-5 mt-2">
            {/* Main Number */}
            <div className="flex flex-col items-center">
              {/* Percentage */}
              <div className="text-4xl">
                {percentage !== undefined ? `${percentage}%` : <span></span>}
                {value !== undefined ? value : ""}
              </div>

              {/* Label */}
              <div className="text-base   text-slate-600 mt-0.5">
                <span>
                  {percentageLabel ? percentageLabel : ""}
                  {valueLabel ? valueLabel : ""}&nbsp;
                </span>
              </div>
            </div>

            {/* Contributor Cards */}
            {contributors && (
              <div className="flex items-center justify-center mt-7 h-1">
                <StackedAvatar contributors={contributors} visibleQuantity={5} />
              </div>
            )}

            {/* Progress Bar */}
            <div
              className={`flex items-center w-full rounded-full mt-7 ${
                percentage && (percentage > 0 || percentage < 99) ? "gap-2" : ""
              }`}
            >
              <div
                className={`${
                  metricIncreases
                    ? percentage && percentage > 70
                      ? "bg-green-500"
                      : percentage && percentage > 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                    : percentage && percentage > 70
                    ? "bg-red-500"
                    : percentage && percentage > 30
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } h-3 rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: (percentage ? percentage : 0) + "%" }}
              ></div>

              <div
                className={`${
                  percentage !== undefined && "bg-gray-200"
                } w-auto flex-auto h-3 rounded-full transition-all duration-500 ease-in-out`}
              ></div>
            </div>
          </div>
        )}
      </>
    </Card>
  );
};

export default HighlightCard;
