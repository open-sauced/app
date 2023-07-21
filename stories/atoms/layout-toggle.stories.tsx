import { ComponentStory } from "@storybook/react";
import LayoutToggle from "components/atoms/LayoutToggle/layout-toggle";

const storyConfig = {
  title: "Design System/Atoms/LayoutToggle",
};
export default storyConfig;

const LayoutToggleTemplate: ComponentStory<typeof LayoutToggle> = (args) => <LayoutToggle {...args} />;

export const Default = LayoutToggleTemplate.bind({});

Default.args = {
  onChange: (value) => console.log(value),
  value: "grid",
};
