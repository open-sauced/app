import { ComponentStory } from "@storybook/react";
import ContextClueCard from "components/molecules/ContextClueCard/context-clue-card";

const storyConfig = {
  title: "Design System/Molecules/ContextClueCard",
};
export default storyConfig;

const ContextClueCardTemplate: ComponentStory<typeof ContextClueCard> = (args) => <ContextClueCard {...args} />;

export const DefaultStory = ContextClueCardTemplate.bind({});

DefaultStory.args = {
  title: "Title",
  desc: "Lorem ipsum dolor sit amet consectetur. Tempus nascetur in nisl justo posuere lacinia blandit mi. Arcu eget tellus nibh pharetra est aliquam turpis. Penatibus in vulputate dui egestas vestibulum id pharetra. A urna donec in pharetra eu nec.",
};
