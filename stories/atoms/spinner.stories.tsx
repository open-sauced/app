import { ComponentStory } from "@storybook/react";
import SpinLoader from "components/atoms/SpinLoader/spin-loader";

const storyConfig = {
  title: "Design System/Atoms/SpinLoader"
};
export default storyConfig;

const SpinLoaderTemplate: ComponentStory<typeof SpinLoader> = (args) => <SpinLoader {...args} />;

export const SpinLoaderStory = SpinLoaderTemplate.bind({});
