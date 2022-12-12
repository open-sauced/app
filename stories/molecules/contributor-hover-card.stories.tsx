import { TipProvider } from "components/atoms/Tooltip/tooltip";
import ContributorHoverCard from "components/molecules/ContributorHoverCard/contributor-hover-card";
import { ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Molecules/ContributorHoverCard"
};
export default storyConfig;

const ScatterChartTooltipTemplate: ComponentStory<typeof ContributorHoverCard> = (args) => (
  <TipProvider>
    <ContributorHoverCard {...args} />
  </TipProvider>
);

export const ScatterChartTooltipStory = ScatterChartTooltipTemplate.bind({});

ScatterChartTooltipStory.args = {
  repoList: [],
  githubName: "SunGoldTech",
  totalPR: 23,
  dateOfFirstPr: "3mo"
};
