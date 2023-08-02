import { ComponentStory } from "@storybook/react";
import AvatarRoll from "components/molecules/AvatarRoll/avatar-roll";

const StoryConfig = {
  title: "Design System/Molecules/AvatarRoll",
};
export default StoryConfig;

const AvatarRollTemplate: ComponentStory<typeof AvatarRoll> = (args) => <AvatarRoll {...args} />;

export const AvatarRollDefault = AvatarRollTemplate.bind({});
