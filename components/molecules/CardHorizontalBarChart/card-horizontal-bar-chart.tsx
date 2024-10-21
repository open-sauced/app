import { useEffect, useState } from "react";
import colors from "../../../lib/utils/color.json";

export interface AllSimpleColors {
  [key: string]: {
    color: string | null;
    url: string;
  };
}

const NOTSUPPORTED = "#64748B";

export interface LanguageObject {
  languageName: string;
  percentageUsed: number;
}

interface CardHorizontalBarChartProps {
  languageList: LanguageObject[];
}

const languageToColor: AllSimpleColors = colors as AllSimpleColors;

const CardHorizontalBarChart = ({ languageList }: CardHorizontalBarChartProps): JSX.Element => {
  const sortedLangArray = languageList.sort((a, b) => b.percentageUsed - a.percentageUsed);
  // used this state to calculate thte percentage of each language
  const [percentage, setPercentage] = useState<any>(0);

  useEffect(() => {
    if (sortedLangArray.length === 0) return;

    const totalSumOfFirstFivePercentage = sortedLangArray
      .slice(0, 4)
      .map((lang) => lang.percentageUsed)
      .reduce((prev: number, next: number) => prev + next); // need some help fixing this type error, used any to bypass 🙏
    setPercentage(totalSumOfFirstFivePercentage);
  }, [percentage, sortedLangArray]);

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      {/* Progress Bar */}
      <div className="flex items-center w-full justify-end rounded-full gap-0.5 overflow-hidden">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) => {
          return (
            index < 5 && (
              <div
                key={index}
                className="h-2 transition-all duration-500 ease-in-out"
                style={{
                  width: `${percentageUsed < 20 ? (percentageUsed / percentage) * 100 : percentageUsed}%`,
                  backgroundColor: languageToColor[languageName]
                    ? (languageToColor[languageName].color as string)
                    : NOTSUPPORTED,
                }}
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;
