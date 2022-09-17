import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface CardLineChartProps {
  lineChartOption: Object;
}

const CardLineChart: React.FC<CardLineChartProps> = ({ lineChartOption }) => {
  return (
    <>
      <EChartWrapper option={lineChartOption} />
    </>
  );
};

export default CardLineChart;