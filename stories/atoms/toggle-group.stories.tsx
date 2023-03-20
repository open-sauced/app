import React from "react";
import { ComponentStory } from "@storybook/react";
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
    <div key={1}>Option 1 w\ <a href="#" target="_blank">link</a></div>,
    <p key={2}>Option 2 w\ <strong>strong</strong></p>,
    <div key={3}>Option 3 w\ <div>div</div></div>
  ],
  defaultSelection: "0",
  className: "w-max"
};
