import Radio from "components/atoms/Radio/radio";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const storyConfig = {
  title: "Design System/Atoms/Radio"
};
export default storyConfig;

const RadioTemplate: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;
export const Default = RadioTemplate.bind({});
export const Checked = RadioTemplate.bind({});
Checked.args = {
  children: "Test",
  checked: true,
  withLabel: true,
  css: "w-full"
};
Default.args = {
  children: "Test",
  id: "select",
  css: "w-max"
};
