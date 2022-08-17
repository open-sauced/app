import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContributorseChart from "components/molecules/ContributorsEChart/e-chart";

const storyConfig = {
  title: "Design System/Molecules/Contributors eChart - to be renamed",
  component: "ScatterChart"
};

export default storyConfig;

const testOptions  = {
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    show: false
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
const ScatterChartTemplate: ComponentStory<typeof ContributorseChart> = (args) => <ContributorseChart {...args} />;

// ScatterChart Default
export const Default = ScatterChartTemplate.bind({});
Default.args = { option: testOptions };