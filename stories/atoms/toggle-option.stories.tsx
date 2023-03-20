import { ComponentStory } from "@storybook/react";
import ToggleOption from "components/atoms/ToggleOption/toggle-option";

const storyConfig = {
  title: "Design System/Atoms/ToggleOption"
};

export default storyConfig;

const ToggleOptionTemplate: ComponentStory<typeof ToggleOption> = (args) => <ToggleOption {...args} />;
export const Default = ToggleOptionTemplate.bind({});
export const WithIcon = ToggleOptionTemplate.bind({});
Default.args = {
  optionText: "test"
};
WithIcon.args ={
  optionText: "text",
  withIcon: true
};