import { ComponentStory } from "@storybook/react";
import Select from "components/atoms/Select/custom-select";
import SelectOption from "components/atoms/Select/select-option";
const StoryConfig = {
  title: "Design System/Atoms/Custom select"
};
export default StoryConfig;

const SelectTemplate: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const NoLabel = SelectTemplate.bind({});
NoLabel.args = {
  options: [
    { name: "select", value: "select" },
    { name: "food", value: "food" }
  ],
  placeholder: "Select an option"
};
export const WithLabel = SelectTemplate.bind({});
WithLabel.args = {
  options: [
    { name: "select", value: "select" },
    { name: "food", value: "food" }
  ],
  label: "Showing"
};
