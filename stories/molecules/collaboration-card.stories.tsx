import { ComponentStory } from "@storybook/react";
import CollaborationCard from "components/molecules/CollaborationCard/collaboration-card";

const storyConfig = {
  title: "Design System/Molecules/Collaboration Card"
};

export default storyConfig;

export const CollaborationCardTemplate: ComponentStory<typeof CollaborationCard> = () => <CollaborationCard />;
