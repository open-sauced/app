import UserCard from "components/atoms/UserCard/user-card";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const storyConfig = {
  title: "Design System/Atoms/UserCard",
} as ComponentMeta<typeof UserCard>;

export default storyConfig;

const UserCardTemplate: ComponentStory<typeof UserCard> = (args) => <UserCard {...args} />;

export const UserCardStory = UserCardTemplate.bind({});

export const NoActivities = UserCardTemplate.bind({});

UserCardStory.args = {
  username: "foxyblocks",
  name: "Chris Schlensker",
  followersCount: 2,
  highlightsCount: 57,
  followingCount: 102,
};

NoActivities.args = {
  username: "foxyblocks",
  name: "Chris Schlensker",
  followersCount: 0,
  followingCount: 0,
  highlightsCount: 0,
};
