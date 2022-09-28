import { useEffect, useState } from "react";
import Text from "components/atoms/Typography/text";
import colors from "../../../lib/utils/color.json";

interface AllSimpleColors {
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

  const [descriptText, setDescriptText] = useState(sortedLangArray[0].languageName);

  const handleChangeDescriptText = (descriptText: string) => {
    setDescriptText(descriptText);
  };

  useEffect(() =>{
    const totalSumOfFirstFivePercentage = sortedLangArray.map((lang, index) => index < 5 && lang.percentageUsed).reduce((prev: any, next: any) => prev + next); // need some help fixing this type error, used any to bypass 🙏
    setPercentage(totalSumOfFirstFivePercentage);
  },[percentage, sortedLangArray]);

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      {/* Progress Bar */}
      <div className="flex items-center w-full justify-end rounded-full gap-0.5 overflow-hidden">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) =>
        {

          return  index < 5 && ( <div
            key={index}
            onMouseOver={() => handleChangeDescriptText(languageName)}
            className="h-2 transition-all duration-500 ease-in-out"
            style={{ width: `${percentageUsed < 20 ? percentageUsed / percentage * 100 : percentageUsed}%`, backgroundColor: languageToColor[languageName] ? languageToColor[languageName].color as string : NOTSUPPORTED }}
          />);
        }

        )}
      </div>
      <div className="flex gap-2 items-center">
        <div className={"w-2 h-2 rounded-full"} style={{ backgroundColor: languageToColor[descriptText] ? languageToColor[descriptText].color as string : NOTSUPPORTED }}/>
        <Text className="!text-xs !font-semibold !text-light-slate-11">
          {descriptText}
        </Text>
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;
