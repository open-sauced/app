import { ComponentStory } from "@storybook/react";
import Selector from "components/atoms/Selector/selector";

const storyConfig = {
  title: "Design System/Atoms/Selector",
  component: "Select"
};

export default storyConfig;

const options = [
  { name: "option1", value: "option1" },
  { name: "option2", value: "option2" },
  { name: "option3", value: "option3" },
  { name: "option4", value: "option4" }
];

//Select Template
const SelectTemplate: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;

export const Default = SelectTemplate.bind({});
export const CheckMarks = SelectTemplate.bind({});

Default.args = {
  filterOptions: options,
  selected: "option1"
};

CheckMarks.args = {
  filterOptions: options,
  selected: "option1",
  variation: "check"
};
