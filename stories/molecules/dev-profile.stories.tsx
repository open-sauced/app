import { StoryFn } from "@storybook/react";
import DevProfile from "components/molecules/DevProfile/dev-profile";

const storyConfig = {
  title: "Design System/Molecules/DevProfile",
  component: DevProfile,
};
export default storyConfig;

const DevProfileTemplate: StoryFn<typeof DevProfile> = (args) => <DevProfile {...args} />;

export const DevProfileStory = DevProfileTemplate.bind({});

DevProfileStory.args = {
  username: "foxyblocks",
  hasBorder: false,
};
