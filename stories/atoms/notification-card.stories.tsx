import { ComponentStory } from "@storybook/react";
import NotificationCard from "components/atoms/NotificationsCard/notification-card";

const storyConfig = {
  title: "Design System/Atoms/NotificationCard"
};
export default storyConfig;

const NotificationCardTemplate: ComponentStory<typeof NotificationCard> = (args) => <NotificationCard {...args} />;

export const Reations = NotificationCardTemplate.bind({});
export const Follows = NotificationCardTemplate.bind({});
export const Collaborations = NotificationCardTemplate.bind({});

Reations.args = {
  type: "highlight_reaction",
  message: "Sam Smith reacted to your highlight"
};

Follows.args = {
  type: "follow",
  message: "Sam Smith reacted to your highlight"
};

Collaborations.args = {
  type: "collaboration",
  message: "Sam Smith reacted to your highlight"
};
