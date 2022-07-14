import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectableTable from "../../components/molecules/SelectableTable/selectable-table";

const storyConfig = {
  title: "Design System/Molecules/Selectable Table",
  component: "SelectableTable"
};

export default storyConfig;

const testRows = [
  {
    title: "freecodecamp",
    stars: 100,
    forks: 20,
    persons: 40,
    unknown: 5
  },
  {
    title: "free-programming-books",
    stars: 60,
    forks: 10,
    persons: 20,
    unknown: 5
  },
  {
    title: "material-ui",
    stars: 20,
    forks: 30,
    persons: 10,
    unknown: 2
  },
  {
    title: "react",
    stars: 100,
    forks: 20,
    persons: 30,
    unknown: 10
  },
  {
    title: "java-design-patterns",
    stars: 20,
    forks: 14,
    persons: 10,
    unknown: 0
  }
];

// SelectableTable Template
const SelectableTableTemplate: ComponentStory<typeof SelectableTable> = (args) => <SelectableTable {...args} />;

// SelectableTable Default
export const Default = SelectableTableTemplate.bind({});
Default.args = {title: "Test Title", tableType: "participants", rows: testRows };