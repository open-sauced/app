import { ComponentStory } from "@storybook/react";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";
import { mockDbContributions } from "../mockedData";

const storyConfig = {
  title: "Design System/Molecules/Recommended Repo Card"
};
export default storyConfig;

const template: ComponentStory<typeof RecommendedRepoCard> = (args) => (
  <RecommendedRepoCard {...args} />
);

export const Default = template.bind({});
Default.args = {
  contributions: mockDbContributions,
  fullname: "open-sauced/insights",
  description: "A dashboard for your GitHub insights",
  issues: 1200,
  pullRequests: 50,
  stars: 3001,
};
