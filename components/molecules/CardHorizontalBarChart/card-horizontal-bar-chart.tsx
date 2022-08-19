import { useState } from "react";
import { languageToColor } from "lib/utils/language-to-color";

interface LanguageObject {
  languageName: string;
  percentageUsed: number;
}

interface CardHorizontalBarChartProps {
  languagesUsed: LanguageObject[];
}

const CardHorizontalBarChart = ({ languagesUsed }: CardHorizontalBarChartProps): JSX.Element => {
  const sortedLangArray = languagesUsed.sort((a, b) => b.percentageUsed - a.percentageUsed);

  const [descriptText, setDescriptText] = useState(sortedLangArray[0].languageName);

  const handleChangeDescriptText = (descriptText: string) => {
    setDescriptText(descriptText);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Progress Bar */}
      <div className="flex items-center w-full rounded-full gap-2 mt-7">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) => 
          <div
            key={index}
            onMouseOver={() => handleChangeDescriptText(languageName)}
            className={`${languageToColor[languageName] ? languageToColor[languageName] : languageToColor["notSupported"]} h-3 ${index === 0 ? "rounded-l-lg" : index === languagesUsed.length - 1 ? "rounded-r-lg" : ""} transition-all duration-500 ease-in-out`}
            style={{ width: `${percentageUsed}%` }}
          />
        )}
      </div>
      <div className="flex gap-2">
        <div className={`w-6 rounded-full ${languageToColor[descriptText.toLowerCase()] ? languageToColor[descriptText.toLowerCase()] : languageToColor["notSupported"]}`}/>{descriptText}
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;