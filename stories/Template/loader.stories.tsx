import { ComponentStory } from "@storybook/react";
import Loader from "components/templates/Loader/loader";

const StoryConfig = {
  title: "Design System/Template/Loader",
  argTypes: {
    theme: ["light", "dark"],
  },
};

export default StoryConfig;

const LoaderTemplate: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;
export const DarkLoader = LoaderTemplate.bind({});
DarkLoader.args = {
  theme: "dark",
};
export const LightLoader = LoaderTemplate.bind({});
LightLoader.args = {
  theme: "light",
};
