import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";

const storyConfig = {
  title: "Design System/Molecules/Card Line Chart",
  component: "ScatterChart"
};

export default storyConfig;

const testOptions  = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Jan 2022", "Mar 2022", "Jun 2022"]
  },
  yAxis: {
    type: "value",
    show: false
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
      showSymbol: false,
      lineStyle: {
        color: "#ff9800"
      },
      areaStyle: {
        color: "#ff9800"
      }
    }
  ]
};

// ScatterChart Template
const CardLineChartTemplate: ComponentStory<typeof CardLineChart> = (args) => <CardLineChart {...args} />;

// ScatterChart Default
export const Default = CardLineChartTemplate.bind({});
Default.args = { option: testOptions };