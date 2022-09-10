import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PROverview from "components/molecules/PROverview/pr-overview";

const storyConfig = {
  title: "Design System/Atoms/PR Overview Chart",
  component: "PROverview"
};

export default storyConfig;

//PROverview Template
const PROverviewTemplate: ComponentStory<typeof PROverview> = (args) => <PROverview {...args} />;

export const Default = PROverviewTemplate.bind({});

Default.args = {
  open: 2,
  merged: 28,
  closed: 0,
  draft: 38
};