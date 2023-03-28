import { ComponentStory } from "@storybook/react";
import RadioCheck from "components/atoms/RadioCheck/radio-check";

const storyConfig = {
  title: "Design System/Atoms/Radio Check"
};
export default storyConfig;

const RadioTemplate: ComponentStory<typeof RadioCheck> = (args) => <RadioCheck {...args} />;
export const Default = RadioTemplate.bind({});
export const Checked = RadioTemplate.bind({});
Checked.args = {
  children: "Test",
  checked: true,
  className: "w-full"
};
Default.args = {
  children: "Test",
  className: "w-max"
};
