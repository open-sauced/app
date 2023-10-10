import { ComponentStory } from "@storybook/react";

import ConnectionSummaryCard from "components/molecules/ConnectionSummaryCard/connection-summary-card";

const storyConfig = {
  title: "Design System/Molecules/Connection Summary card",
};

export default storyConfig;

const ConnectionCardTemplate: ComponentStory<typeof ConnectionSummaryCard> = (args) => (
  <ConnectionSummaryCard {...args} />
);

const requestor = {
  login: "jsmith123",
  name: "Janice Smith",
} as DbUser;

export const ConnectionCardStory = ConnectionCardTemplate.bind({});

ConnectionCardStory.args = {
  requests: [
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor,
      requestId: "nsodijsoiofer",
      onAccept(id) {},
      onDecline(id) {},
    },
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor,
      requestId: "nsodijsoiofer",
      onAccept(id) {},
      onDecline(id) {},
    },
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor,
      requestId: "nsodijsoiofer",
      onAccept(id) {},
      onDecline(id) {},
    },
  ],
  connectionsCount: 34,
  messagesCount: 23,
};
