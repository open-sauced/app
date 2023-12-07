import { ComponentMeta, ComponentStory } from "@storybook/react";
import UserCard from "components/atoms/UserCard/user-card";

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
  meta: [
    { name: "Followers", count: 3 },
    { name: "Following", count: 103 },
    { name: "Highlights", count: 55 },
  ],
};

NoActivities.args = {
  username: "foxyblocks",
  name: "Chris Schlensker",
  meta: [
    { name: "Followers", count: 0 },
    { name: "Following", count: 0 },
    { name: "Highlights", count: 0 },
  ],
};
