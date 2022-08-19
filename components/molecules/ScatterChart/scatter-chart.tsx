import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ComponentHeader from "../ComponentHeader/component-header";

interface ScatterChartProps {
    title: string;
    option: Object;
}

const ScatterChart: React.FC<ScatterChartProps> = ({ title, option }) => {
  return (
    <>
      <ComponentHeader title={title} />
      <EChartWrapper option={option} />
    </>
  );
};

export default ScatterChart;