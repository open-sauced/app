import Badge from "components/atoms/Badge/badge";
import { ComponentStory } from "@storybook/react";

const StoryConfig = {
  title: "Design System/Atoms/Badge"
};
export default StoryConfig;

const BadgeTemplate: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const BadgeStory = BadgeTemplate.bind({});

BadgeStory.args = {
  text: "beta"
};
