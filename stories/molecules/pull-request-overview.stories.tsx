import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PullRequestOverview from "components/molecules/PullRequestOverview/pull-request-overview";

const storyConfig = {
  title: "Design System/Atoms/Pull Request Overview Chart",
  component: "PullRequestOverview"
};

export default storyConfig;

//PullRequestOverview Template
const PullRequestOverviewTemplate: ComponentStory<typeof PullRequestOverview> = (args) => <PullRequestOverview {...args} />;

export const Default = PullRequestOverviewTemplate.bind({});

Default.args = {
  open: 2,
  merged: 28,
  closed: 0,
  draft: 38
};