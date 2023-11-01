import { ComponentStory } from "@storybook/react";
import ConnectionCard from "components/molecules/ConnectionCard/connection-card";

const storyConfig = {
  title: "Design System/Molecules/Connection Card",
};

export default storyConfig;

const ConnectionCardTemplate: ComponentStory<typeof ConnectionCard> = (args) => <ConnectionCard {...args} />;

export const ConnectionCardStory = ConnectionCardTemplate.bind({});

ConnectionCardStory.args = {
  outreachMessage:
    " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
  requestor: {
    login: "jsmith123",
    name: "Janice Smith",
  } as DbUser,
};
