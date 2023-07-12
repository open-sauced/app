import { StoryFn } from "@storybook/react";
import TopUserCard from "components/atoms/TopUserCard/top-user-card";

const storyConfig = {
  title: "Design System/Atoms/TopUserCard",
};
export default storyConfig;

const TopUserCardTemplate: StoryFn<typeof TopUserCard> = (args) => <TopUserCard {...args} />;

export const Following = TopUserCardTemplate.bind({});
export const NotFollowing = TopUserCardTemplate.bind({});

Following.args = {
  login: "diivi",
};

NotFollowing.args = {
  login: "ogdev-01",
};
