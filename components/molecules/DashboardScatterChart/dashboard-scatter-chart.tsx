import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import ComponentHeader from "../ComponentHeader/component-header";
import ScatterChart from "../ScatterChart/scatter-cart";

interface DashboardScatterChartProps {
    title: string;
    option: Object;
}

const DashboardScatterChart: React.FC<DashboardScatterChartProps> = ({ title, option }) => {
  return (
    <>
      <ScatterChart title={title} option={option}/>
    </>
  );
};

export default DashboardScatterChart;