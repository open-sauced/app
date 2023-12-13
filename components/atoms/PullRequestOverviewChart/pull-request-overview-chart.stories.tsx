import { ComponentStory } from "@storybook/react";
import PullRequestOverviewChart from "components/atoms/PullRequestOverviewChart/pull-request-overview-chart";

const storyConfig = {
  title: "Design System/Atoms/Pull Request Overview Chart",
  component: "PullRequestOverviewChart",
};

export default storyConfig;

//PullRequestOverviewChart Template
const PullRequestOverviewChartTemplate: ComponentStory<typeof PullRequestOverviewChart> = (args) => (
  <PullRequestOverviewChart {...args} />
);

export const Default = PullRequestOverviewChartTemplate.bind({});

Default.args = {
  open: 2,
  merged: 28,
  closed: 3,
  draft: 38,
};
