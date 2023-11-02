import { ComponentStory } from "@storybook/react";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";

const storyConfig = {
  title: "Design System/Atoms/ToggleSwitch",
};

export default storyConfig;

const ToggleSwitchTemplate: ComponentStory<typeof ToggleSwitch> = (args) => <ToggleSwitch {...args} />;
export const Default = ToggleSwitchTemplate.bind({});
export const Small = ToggleSwitchTemplate.bind({});
export const Large = ToggleSwitchTemplate.bind({});
export const Custom = ToggleSwitchTemplate.bind({});
Default.args = {
  name: "test",
  checked: false,
  size: "base",
  ariaLabel: "This is a toggle switch",
};
Small.args = {
  name: "test",
  checked: false,
  size: "sm",
  ariaLabel: "This is a toggle switch",
};
Large.args = {
  name: "test",
  checked: false,
  size: "lg",
  ariaLabel: "This is a toggle switch",
};
Custom.args = {
  name: "test",
  checked: false,
  classNames: "w-8 h-4",
  ariaLabel: "This is a toggle switch",
};
