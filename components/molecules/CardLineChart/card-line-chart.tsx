import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface CardLineChartProps {
  lineChartOption: Object;
  className?: string;
  height?: `${number}px`;
}

const CardLineChart: React.FC<CardLineChartProps> = ({ lineChartOption, className, height }) => {
  return (
    <>
      <EChartWrapper option={lineChartOption} className={className} height={height} />
    </>
  );
};

export default CardLineChart;
