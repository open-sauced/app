import React from "react";
import ReactECharts from "echarts-for-react";

/*
Docs for eChart: https://echarts.apache.org/en/feature.html
eChart Examples:  https://echarts.apache.org/examples/en/editor.html?c=scatter-simple&lang=ts
Docs for ReactECharts: https://github.com/hustcc/echarts-for-react
 */

interface CardLineChartProps {
  lineChartOption: Object;
  className?: string;
  height?: `${number}px`;
}

const CardLineChart: React.FC<CardLineChartProps> = ({ lineChartOption, className, height = "130px" }) => {
  return (
    <>
      <ReactECharts
        option={lineChartOption}
        className={className || ""}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        style={{ height: height }}
      />
    </>
  );
};

export default CardLineChart;
