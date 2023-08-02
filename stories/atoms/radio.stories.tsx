import { ComponentStory } from "@storybook/react";
import Radio from "components/atoms/Radio/radio";

const storyConfig = {
  title: "Design System/Atoms/Radio",
};
export default storyConfig;

const RadioTemplate: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;
export const Default = RadioTemplate.bind({});
export const Checked = RadioTemplate.bind({});
Checked.args = {
  children: "Test",
  checked: true,
  withLabel: "32k",
  className: "w-full",
};
Default.args = {
  children: "Test",
  id: "select",
  className: "w-max",
};
