import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ComponentHeader from "../ComponentHeader/component-header";

interface DashboardScatterChartProps {
    title: string;
    option: Object;
}

const DashboardScatterChart: React.FC<DashboardScatterChartProps> = ({ title, option }) => {
  return (
    <>
      <ComponentHeader title={title} />
      <EChartWrapper option={option} />
    </>
  );
};

export default DashboardScatterChart;