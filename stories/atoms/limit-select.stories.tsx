import { ComponentStory } from "@storybook/react";
import LimitSelect from "components/atoms/Select/limit-select";

const StoryConfig = {
  title: "Design System/Atoms/Limit Select"
};

export default StoryConfig;

const SelectTemplate: ComponentStory<typeof LimitSelect> = (args) => (
  <div className="flex items-center w-full h-full">
    <LimitSelect {...args} />
  </div>
);

export const Default = SelectTemplate.bind({});

Default.args = {
  options: [
    { name: "select", value: "select" },
    { name: "food", value: "food" },
    { name: "fruit", value: "fruit" }
  ],
  placeholder: "Select an option"
};
