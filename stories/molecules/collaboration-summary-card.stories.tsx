import { ComponentStory } from "@storybook/react";

import CollaborationSummaryCard from "components/molecules/CollaborationSummaryCard/collaboration-summary-card";

const storyConfig = {
  title: "Design System/Molecules/Collaboration Summary card"
};

export default storyConfig;

const CollaborationCardTemplate: ComponentStory<typeof CollaborationSummaryCard> = (args) => (
  <CollaborationSummaryCard {...args} />
);

export const CollaborationCardStory = CollaborationCardTemplate.bind({});

CollaborationCardStory.args = {
  requests: [
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor: undefined
    },
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor: undefined
    },
    {
      outreachMessage:
        " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
      requestor: undefined
    }
  ],
  connectionsCount: 34,
  messagesCount: 23
};
