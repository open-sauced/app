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
}

const EChartWrapper: React.FC<EChartWrapperProps> = ({ option, className }) => {
  return (
    <ReactECharts option={option} className={className || ""} notMerge={true} lazyUpdate={true} theme={"theme_name"} />
  );
};

export default EChartWrapper;
