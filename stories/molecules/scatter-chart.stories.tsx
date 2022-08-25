import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ScatterChart from "../../components/molecules/ScatterChart/scatter-chart";

const storyConfig = {
  title: "Design System/Molecules/Scatter Chart",
  component: "ScatterChart"
};

export default storyConfig;

const testOptions = {
  xAxis: {
    boundaryGap: false,
    scale: true,
    minInterval: 7,
    maxInterval: 7,
    min: 0,
    max: 35,
    axisLabel: {
      formatter: (value: number, index: number) => value === 0 ? "Today" : value === 35 ? "35+ days ago" : `${value} days ago` 
    },
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    }
  },
  yAxis: {
    min: 0,
    max: 100,
    splitNumber: 2,
    boundaryGap: false,
    axisLabel: {
      showMinLabel: false,
      formatter: "{value}%" 
    },
    splitLine: {
      lineStyle: {
        type: "dashed"
      }
    }
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
        [5.02, 5.68]
      ],
      type: "scatter"
    }
  ]
};

const testOptionsWithImage = {
  xAxis: {},
  yAxis: {},
  series: [
    {
      symbolSize: 30,
      symbol: (value: number[]) => value[0] > 8 ? "image://https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80" : "circle",
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
        [5.02, 5.68]
      ],
      type: "scatter"
    }
  ]
};

// ScatterChart Template
const ScatterChartTemplate: ComponentStory<typeof ScatterChart> = (args) => <ScatterChart {...args} />;

// ScatterChart Default
export const Default = ScatterChartTemplate.bind({});
Default.args = { title: "Test Title", option: testOptions };

// ScatterChart with Images
export const WithImages = ScatterChartTemplate.bind({});
WithImages.args = { title: "Test Title", option: testOptionsWithImage };