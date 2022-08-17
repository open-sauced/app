import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";

interface AreaChartProps {
    option: Object;
}

const AreaChart: React.FC<AreaChartProps> = ({ option }) => {
  return (
    <>
      <EChartWrapper option={option} />
    </>
  );
};

export default AreaChart;