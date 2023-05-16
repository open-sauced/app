import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ComponentStory } from "@storybook/react";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";

const storyConfig = {
  title: "Design System/Molecules/Recommended Repo Card",
};
export default storyConfig;

const template: ComponentStory<typeof RecommendedRepoCard> = (args) => (
  <TooltipProvider>
    <RecommendedRepoCard {...args} />
  </TooltipProvider>
);

export const Default = template.bind({});
Default.args = {
  fullName: "open-sauced/insights",
};
