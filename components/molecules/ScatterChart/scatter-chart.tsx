import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface ScatterChartProps {
    option: Object;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ option }) => {
  return (
    <EChartWrapper option={option} />
  );
};

export default ScatterChart;