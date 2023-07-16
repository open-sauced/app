import { StoryFn } from "@storybook/react";
import TopContributorCard from "components/atoms/TopContributorCard/top-contributor-card";

const storyConfig = {
  title: "Design System/Atoms/TopContributorCard",
};
export default storyConfig;

const TopContributorCardTemplate: StoryFn<typeof TopContributorCard> = (args) => <TopContributorCard {...args} />;

export const Following = TopContributorCardTemplate.bind({});
export const NotFollowing = TopContributorCardTemplate.bind({});

Following.args = {
  login: "diivi",
};

NotFollowing.args = {
  login: "ogdev-01",
};
