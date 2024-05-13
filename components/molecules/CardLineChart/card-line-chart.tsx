import React from "react";
import EChartWrapper from "components/atoms/EChartWrapper/echart-wrapper";
import { getPullRequestsHistogramToDays } from "lib/utils/get-prs-to-days";
import { usePullRequestsHistogram } from "lib/hooks/api/usePullRequestsHistogram";
import getFormattedTooltipValue from "lib/utils/get-formatted-tooltip-value";

interface CardLineChartProps {
  className?: string;
  contributor: string;
  repositories?: string[];
  range?: number;
}

const CardLineChart: React.FC<CardLineChartProps> = ({ className, contributor, repositories = [], range = 30 }) => {
  const lineChart = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      axisLabel: false,
    },
    yAxis: {
      type: "value",
      splitNumber: 1,
      axisLabel: false,
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
    },
    grid: {
      height: 130,
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    series: [
      {
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#ff9800",
        },
        areaStyle: {
          color: "#FFB74D",
          opacity: 0.6,
        },
        clip: false,
      },
    ],
    tooltip: {
      trigger: "axis",
      formatter: getFormattedTooltipValue,
    },
  };
  const { data: histogramData } = usePullRequestsHistogram({
    repositories,
    range: Number(range),
    width: 1,
    contributor,
    direction: "ASC",
  });

  const chartData = getPullRequestsHistogramToDays(histogramData, Number(range));
  const graphData = chartData.map((day) => {
    return {
      x: day.x,
      y: day.y,
    };
  });

  const lineChartOption = {
    ...lineChart,
    xAxis: {
      ...lineChart.xAxis,
      data: graphData.map((commit) => `${commit.x}`),
    },
    series: lineChart.series.map((cs) => ({
      ...cs,
      data: graphData.map((commit) => commit.y),
    })),
  };
  return (
    <>
      <EChartWrapper option={lineChartOption} className={className} />
    </>
  );
};

export default CardLineChart;
