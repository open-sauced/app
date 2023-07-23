import { ComponentStory } from "@storybook/react";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";

const storyConfig = {
  title: "Design System/Molecules/Card Line Chart",
  component: "ScatterChart",
};

export default storyConfig;

const testOptions = {
  grid: {
    left: 40,
    top: 10,
    right: 40,
    bottom: 20,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    axisLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: "darkgray",
    },
    data: ["Jan 2022", "Mar 2022", "Jun 2022"],
  },
  yAxis: {
    type: "value",
    splitNumber: 1,
    axisLabel: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
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
      tooltip: {
        trigger: "axis",
      },
    },
  ],
};

// ScatterChart Template
const CardLineChartTemplate: ComponentStory<typeof CardLineChart> = (args) => <CardLineChart {...args} />;

// ScatterChart Default
export const Default = CardLineChartTemplate.bind({});
Default.args = { lineChartOption: testOptions };
