import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ScatterChart from "../../components/molecules/ScatterChart/scatter-chart";

const storyConfig = {
  title: "Design System/Molecules/Scatter Chart",
  component: "ScatterChart"
};

export default storyConfig;

// ScatterChart Template
const ScatterChartTemplate: ComponentStory<typeof ScatterChart> = (args) => <ScatterChart {...args} />;

// ScatterChart Default
export const Default = ScatterChartTemplate.bind({});
Default.args = {  };