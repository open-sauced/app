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
      <div className="flex items-center w-full rounded-full mt-7">
        {languagesUsed.map(({ languageName, percentageUsed }, index) => 
          <div
            key={index}
            onMouseOver={() => handleChangeDescriptText(languageName)}
            className={`w-[${percentageUsed}%] ${languageToColor[languageName] ? languageToColor[languageName] : ""} h-3 rounded-full transition-all duration-500 ease-in-out`} />
        )}
      </div>
      <div className="flex gap-2">
        <div className={`w-6 rounded-full ${languageToColor[descriptText] ? languageToColor[descriptText] : ""}`}/>{descriptText}
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;