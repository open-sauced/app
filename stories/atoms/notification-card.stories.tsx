import { ComponentStory } from "@storybook/react";
import NotificationCard from "components/atoms/NotificationsCard/notification-card";

const storyConfig = {
  title: "Design System/Atoms/NotificationCard",
};
export default storyConfig;

const NotificationCardTemplate: ComponentStory<typeof NotificationCard> = (args) => <NotificationCard {...args} />;

export const Reations = NotificationCardTemplate.bind({});
export const Follows = NotificationCardTemplate.bind({});
export const Collaborations = NotificationCardTemplate.bind({});

Reations.args = {
  type: "highlight_reaction",
  message: "sam-smith reacted to your highlight",
  id: "114",
};

Follows.args = {
  type: "follow",
  message: "bdougie followed you",
  id: "bdougie",
};

Collaborations.args = {
  type: "collaboration",
  message: "bdougie invited you to collaborate",
  id: "1s356g",
};
