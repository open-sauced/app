import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PullRequestOverview from "components/molecules/PullRequestOverview/pull-request-overview";

const storyConfig = {
  title: "Design System/Molecules/Pull Request Overview",
  component: "PullRequestOverview"
};

export default storyConfig;

//PullRequestOverview Template
const PullRequestOverviewTemplate: ComponentStory<typeof PullRequestOverview> = (args) => (
  <div style={{width: "8rem"}}>
    <PullRequestOverview {...args} />
  </div>
);

export const Default = PullRequestOverviewTemplate.bind({});

Default.args = {
  open: 2,
  merged: 0,
  closed: 0,
  draft: 3,
  churn: 20,
  churnDirection: "up"
};