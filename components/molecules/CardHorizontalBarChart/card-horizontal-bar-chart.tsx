import { useState } from "react";

const CardHorizontalBarChart = (): JSX.Element => {
  const [descriptText, setDescriptText] = useState("test");

  const languageToColor = {
    javascript: "bg-yellow-500",
    typescript: "bg-blue-500"
  };

  const percentage = 50;
  const metricIncreases = true;

  const handleMouseOver = () => {
    setDescriptText("Hello");
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Progress Bar */}
      <div className={`flex items-center w-full rounded-full mt-7 ${(percentage && (percentage > 0 || percentage < 99)) ? "gap-2" : ""}`}>
        <div
          onMouseOver={handleMouseOver}
          className={`${metricIncreases ? (percentage && percentage > 70 ? "bg-green-500" : percentage && percentage > 30 ? "bg-yellow-500" : "bg-red-500") : (percentage && percentage > 70 ? "bg-red-500" : percentage && percentage > 30 ? "bg-yellow-500" : "bg-green-500")} h-3 rounded-full transition-all duration-500 ease-in-out`}
          style={{width: (percentage ? percentage : 0) + "%"}} />
      </div>
      <div className="flex gap-2">
        <div className={`w-6 rounded-full ${languageToColor["javascript"]}`}/>{descriptText}
      </div>
    </div>
  );
};

export default CardHorizontalBarChart;