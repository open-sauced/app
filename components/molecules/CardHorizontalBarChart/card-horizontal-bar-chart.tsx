import { useState } from "react";
import Text from "components/atoms/Typography/text";
import colors from "../../../lib/utils/color.json";

interface AllSimpleColors {
  [key: string]: {
    color: string | null;
    url: string;
  };
}

const NOTSUPPORTED = "#64748B";

interface LanguageObject {
  languageName: string;
  percentageUsed: number;
}

interface CardHorizontalBarChartProps {
  languagesUsed: LanguageObject[];
}

const languageToColor: AllSimpleColors = colors as AllSimpleColors;

const CardHorizontalBarChart = ({ languagesUsed }: CardHorizontalBarChartProps): JSX.Element => {
  const sortedLangArray = languagesUsed.sort((a, b) => b.percentageUsed - a.percentageUsed);

  const [descriptText, setDescriptText] = useState(sortedLangArray[0].languageName);

  const handleChangeDescriptText = (descriptText: string) => {
    setDescriptText(descriptText);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Progress Bar */}
      <div className="flex items-center w-full rounded-full gap-1 overflow-hidden mt-7">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) =>
          <div
            key={index}
            onMouseOver={() => handleChangeDescriptText(languageName)}
            className="h-2 transition-all duration-500 ease-in-out"
            style={{ width: `${percentageUsed}%`, backgroundColor: languageToColor[languageName].color ?? NOTSUPPORTED }}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        <div className={"w-2 h-2 rounded-full"} style={{ backgroundColor: languageToColor[descriptText].color ?? NOTSUPPORTED }}/>
        <Text className="!text-xs !font-semibold !text-light-slate-11">
          {descriptText}
        </Text>
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;
