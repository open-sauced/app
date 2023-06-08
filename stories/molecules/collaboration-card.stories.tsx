import { ComponentStory } from "@storybook/react";
import CollaborationCard from "components/molecules/CollaborationCard/collaboration-card";

const storyConfig = {
  title: "Design System/Molecules/Collaboration Card",
};

export default storyConfig;

const CollaborationCardTemplate: ComponentStory<typeof CollaborationCard> = (args) => <CollaborationCard {...args} />;

export const CollaborationCardStory = CollaborationCardTemplate.bind({});

CollaborationCardStory.args = {
  outreachMessage:
    " Hello Nate, we’re currently working on a project and think that you would be a great fit for our team. Would yoube interested in joining us",
  requestor: undefined,
};
