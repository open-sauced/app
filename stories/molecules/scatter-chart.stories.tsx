import { ComponentStory } from "@storybook/react";
import ScatterChart from "components/molecules/ScatterChart/scatter-cart";
import humanizeNumber from "lib/utils/humanizeNumber";
const StoryConfig = {
  title: "Design System/Molecules/ScatterChart",
};
export default StoryConfig;

const testOptions = {
  grid: {
    left: 40,
    top: 10,
    right: 40,
    bottom: 20,
  },
  xAxis: {
    boundaryGap: false,
    scale: true,
    minInterval: 7,
    maxInterval: 7,
    min: 0,
    max: 35,
    axisLabel: {
      formatter: (value: number, index: number) =>
        value === 0 ? "Today" : value === 35 ? "35+ days ago" : `${value} days ago`,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  yAxis: {
    min: 1,
    max: 1000,
    splitNumber: 7,
    boundaryGap: false,
    axisLabel: {
      showMinLabel: true,
      formatter: (value: number) => (value >= 1000 ? humanizeNumber(value) : value),
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      symbolSize: 20,
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: "scatter",
    },
  ],
};
const ScatterChartTemplate: ComponentStory<typeof ScatterChart> = (args) => <ScatterChart {...args} />;

export const Default = ScatterChartTemplate.bind({});
Default.args = { option: testOptions, title: "Contribution Trends" };
