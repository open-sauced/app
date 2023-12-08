import { Meta, StoryObj } from "@storybook/react";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";

const storyConfig = {
  title: "Design System/Molecules/Recommended Repo Card",
  component: RecommendedRepoCard,
} satisfies Meta<typeof RecommendedRepoCard>;
export default storyConfig;

type Story = StoryObj<typeof RecommendedRepoCard>;

export const Default: Story = {
  args: {
    fullName: "open-sauced/insights",
  },
};
