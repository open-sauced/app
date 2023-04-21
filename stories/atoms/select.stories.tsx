import { ComponentStory } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

const storyConfig = {
  title: "Design System/Atoms/Select",
  component: "Select"
};

const SelectOptions = ["test", "Main", "Beta"];

export default storyConfig;

//Select Template
const SelectTemplate: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <SelectTrigger>
      <SelectValue placeholder="Select a Value" />
    </SelectTrigger>
    <SelectContent>
      {SelectOptions.map((option, i) => (
        <SelectItem value={option} key={i}>
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

//Select Option Template (needed?)
// const SelectOptionTemplate: ComponentStory<typeof SelectOption> = (args) => <SelectOption {...args} />;

export const Default = SelectTemplate.bind({});

Default.args = {
  value: "test"
};
