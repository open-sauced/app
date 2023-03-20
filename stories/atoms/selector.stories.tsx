import { ComponentStory } from "@storybook/react";
import Selector from "components/atoms/Selector/selector";

const storyConfig = {
  title: "Design System/Atoms/Selector",
  component: "Select"
};

export default storyConfig;

//Select Template
const SelectTemplate: ComponentStory<typeof Selector> = (args) => <Selector {...args} />;

export const Default = SelectTemplate.bind({});
export const CheckMarks = SelectTemplate.bind({});

Default.args = {
  filterOptions: ["option1", "option2", "option3"],
  selected: "option1"
};

CheckMarks.args = {
  filterOptions: ["option1", "option2", "option3"],
  selected: "option1",
  variation: "check"
};
