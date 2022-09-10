import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PROverviewChart from "components/atoms/PROverviewChart/pr-overview-chart";

const storyConfig = {
  title: "Design System/Atoms/PR Overview Chart",
  component: "PROverviewChart"
};

export default storyConfig;

//PROverviewChart Template
const PROverviewChartTemplate: ComponentStory<typeof PROverviewChart> = (args) => <PROverviewChart {...args} />;

export const Default = PROverviewChartTemplate.bind({});

Default.args = {
  open: 32,
  merged: 28,
  closed: 0,
  draft: 40
};