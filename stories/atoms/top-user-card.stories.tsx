import { ComponentStory } from "@storybook/react";
import TopUserCard from "components/atoms/TopUserCard/top-user-card";

const storyConfig = {
  title: "Design System/Atoms/TopUserCard",
};
export default storyConfig;

const TopUserCardTemplate: ComponentStory<typeof TopUserCard> = (args) => <TopUserCard {...args} />;

export const Following = TopUserCardTemplate.bind({});
export const NotFollowing = TopUserCardTemplate.bind({});

Following.args = {
  username: "diivi",
  following: true,
};

NotFollowing.args = {
  username: "ogdev-01",
  following: false,
};
