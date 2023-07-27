import React from "react";

interface ProgressPieProps {
  className?: string;
  percentage?: number;
  svgStyles?: string;
  circleStyles?: string;
}

const ProgressPie: React.FC<ProgressPieProps> = ({ className, percentage, svgStyles, circleStyles }) => {
  return (
    <div
      className={`${
        className ? className : ""
      } w-6 h-6 text-base relative flex items-center justify-center border-2 rounded-full border-orange-500`}
    >
      <svg className={`${svgStyles ? svgStyles : ""} w-4 h-4 text-base`} viewBox="0 0 20 20" height="20" width="20">
        <circle
          className={`${
            circleStyles ? circleStyles : ""
          } transition-all duration-700 ease-out fill-transparent stroke-orange-500 -rotate-90 translate-y-[20px]`}
          r="5"
          cx="10"
          cy="10"
          strokeWidth="10"
          strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
        ></circle>
      </svg>
    </div>
  );
};

export default ProgressPie;
