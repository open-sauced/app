import { useState } from "react";

interface LanguageObject {
  languageName: string;
  percentageUsed: number;
}

interface CardHorizontalBarChartProps {
  languagesUsed: LanguageObject[];
}

const CardHorizontalBarChart = ({ languagesUsed }: CardHorizontalBarChartProps): JSX.Element => {
  const [descriptText, setDescriptText] = useState(languagesUsed[0].languageName);

  const languageToColor: any = {
    javascript: "bg-yellow-500",
    typescript: "bg-blue-500"
  };

  const handleChangeDescriptText = (descriptText: string) => {
    setDescriptText(descriptText);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Progress Bar */}
      <div className={`flex items-center w-full rounded-full mt-7 ${(languagesUsed[0].percentageUsed && (languagesUsed[0].percentageUsed > 0 || languagesUsed[0].percentageUsed < 99)) ? "gap-2" : ""}`}>
        <div
          onMouseOver={() => handleChangeDescriptText(languagesUsed[0].languageName)}
          className={`${languageToColor[languagesUsed[0].languageName] ? languageToColor[languagesUsed[0].languageName] : ""} h-3 rounded-full transition-all duration-500 ease-in-out`}
          style={{width: (languagesUsed[0].percentageUsed ? languagesUsed[0].percentageUsed : 0) + "%"}} />
      </div>
      <div className="flex gap-2">
        <div className={`w-6 rounded-full ${languageToColor[languagesUsed[0].languageName] ? languageToColor[languagesUsed[0].languageName] : ""}`}/>{descriptText}
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;