import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface CardLineChartProps {
  lineChartOption: Object;
  className?: string;
}

const CardLineChart: React.FC<CardLineChartProps> = ({ lineChartOption, className }) => {
  return (
    <>
      <EChartWrapper option={lineChartOption} className={className} />
    </>
  );
};

export default CardLineChart;
