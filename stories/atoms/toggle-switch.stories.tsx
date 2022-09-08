import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";

const storyConfig = {
  title: "Design System/Atoms/ToggleSwitch"
};

export default storyConfig;

const ToggleSwitchTemplate: ComponentStory<typeof ToggleSwitch> = (args) => <ToggleSwitch {...args} />;
export const Default = ToggleSwitchTemplate.bind({});
Default.args = {
  name: "test",
  checked: false
};
