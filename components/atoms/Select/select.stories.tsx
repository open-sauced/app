import { ComponentStory } from "@storybook/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/atoms/Select/select";

const storyConfig = {
  title: "Design System/Atoms/Select",
  component: "Select",
};

const SelectOptions = ["test", "Main", "Beta"];

export default storyConfig;

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

export const Default = SelectTemplate.bind({});
