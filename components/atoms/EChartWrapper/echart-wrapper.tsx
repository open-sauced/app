import React from "react";
import ReactECharts from "echarts-for-react";

/*
Docs for eChart: https://echarts.apache.org/en/feature.html
eChart Examples:  https://echarts.apache.org/examples/en/editor.html?c=scatter-simple&lang=ts
Docs for ReactECharts: https://github.com/hustcc/echarts-for-react
 */

interface EChartWrapperProps {
  option: Object;
  className?: string;
  height?: `${number}px`;
}

const EChartWrapper: React.FC<EChartWrapperProps> = ({ option, className, height }) => {
  return (
    <ReactECharts
      option={option}
      className={className || ""}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
      style={{ height }}
    />
  );
};

export default EChartWrapper;
