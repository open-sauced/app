import { ComponentStory } from "@storybook/react";
import Select from "components/atoms/Select/custom-select";

const StoryConfig = {
  title: "Design System/Atoms/Custom Select"
};

export default StoryConfig;

const SelectTemplate: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const NoLabel = SelectTemplate.bind({});

NoLabel.args = {
  options: [
    { name: "select", value: "select" },
    { name: "food", value: "food" },
    { name: "fruit", value: "fruit" }
  ],
  className: "w-48",
  placeholder: "Select an option"
};

export const WithLabel = SelectTemplate.bind({});

WithLabel.args = {
  options: [
    { name: "select", value: "select" },
    { name: "food", value: "food" },
    { name: "fruit", value: "fruit" }
  ],
  label: "Showing",
  className: "w-48"
};
