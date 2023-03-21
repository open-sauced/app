import React, { useEffect, useState } from "react";

import { AllSimpleColors, LanguageObject } from "../CardHorizontalBarChart/card-horizontal-bar-chart";

import colors from "../../../lib/utils/color.json";

const languageToColor: AllSimpleColors = colors as AllSimpleColors;
const NOTSUPPORTED = "#64748B";
interface ProfileLanguageChartProps {
  languageList: LanguageObject[];
}
const ProfileLanguageChart = ({ languageList }: ProfileLanguageChartProps) => {
  const sortedLangArray = languageList.sort((a, b) => b.percentageUsed - a.percentageUsed);
  const [percentage, setPercentage] = useState<any>(0);

  useEffect(() => {
    const totalSumOfFirstFivePercentage = sortedLangArray
      .slice(0, 8)
      .map((lang) => lang.percentageUsed)
      .reduce((prev: number, next: number) => prev + next); // need some help fixing this type error, used any to bypass 🙏
    setPercentage(totalSumOfFirstFivePercentage);
  }, [percentage, sortedLangArray]);

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <div className="flex items-center w-full justify-end rounded-full gap-0.5 overflow-hidden">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) => {
          return (
            index < 7 && (
              <div
                key={index}
                className="h-2 transition-all duration-500 ease-in-out"
                style={{
                  width: `${percentageUsed < 20 ? (percentageUsed / percentage) * 100 : percentageUsed}%`,
                  backgroundColor: languageToColor[languageName]
                    ? (languageToColor[languageName].color as string)
                    : NOTSUPPORTED
                }}
              />
            )
          );
        })}
      </div>
      <div className="flex mt-2 flex-wrap text-sm gap-x-4 gap-y-2 text-light-slate-10">
        {sortedLangArray.map(({ languageName, percentageUsed }, i) => (
          <div key={i} className="flex items-center gap-2.5 ">
            <span
              style={{
                backgroundColor: languageToColor[languageName]
                  ? (languageToColor[languageName].color as string)
                  : NOTSUPPORTED
              }}
              className="w-2.5 h-2.5 rounded-full "
            ></span>
            <p>
              {languageName}{" "}
              <span className="text-light-slate-8  font-normal">{`${Number(percentageUsed).toFixed(1)}%`}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileLanguageChart;
