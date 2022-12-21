import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ToggleSwitch from "components/atoms/ToggleSwitch/toggle-switch";
import ToggleGroup from "components/atoms/ToggleGroup/toggle-group";

const storyConfig = {
  title: "Design System/Atoms/ToggleGroup"
};

export default storyConfig;

const ToggleSwitchTemplate: ComponentStory<typeof ToggleGroup> = (args) => <ToggleGroup {...args} />;
export const Default = ToggleSwitchTemplate.bind({});
export const AllowNone = ToggleSwitchTemplate.bind({});
export const CustomItems = ToggleSwitchTemplate.bind({});
Default.args = {
  children: [
    <>Option 1</>,
    <>Option 2</>,
    <>Option 3</>
  ],
  defaultSelection: "0",
  className: "w-max"
};
AllowNone.args = {
  children: [
    <>Option 1</>,
    <>Option 2</>,
    <>Option 3</>
  ],
  allowNone: true,
  className: "w-max"
};
CustomItems.args = {
  children: [
    <div>Option 1 w\ <a href="#" target="_blank">link</a></div>,
    <p>Option 2 w\ <strong>strong</strong></p>,
    <div>Option 3 w\ <div>div</div></div>
  ],
  defaultSelection: "0",
  className: "w-max"
};
