import Radio from "components/atoms/Radio/radio";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const storyConfig = {
  title: "Design System/Atoms/Radio",
};
export default storyConfig;

const RadioTemplate: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;
export const Default = RadioTemplate.bind({});
export const Checked = RadioTemplate.bind({});
Checked.args = {
  label: "Test",
  checked: true,
  id: "select1",
};
Default.args = {
  label: "Test",
  id: "select",
};
