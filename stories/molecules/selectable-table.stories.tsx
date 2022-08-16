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
    name: "freecodecamp",
    stars: 100,
    forks: 20,
    size: 5
  },
  {
    name: "free-programming-books",
    stars: 60,
    forks: 10,
    size: 5
  },
  {
    name: "material-ui",
    stars: 20,
    forks: 30,
    size: 2
  },
  {
    name: "react",
    stars: 100,
    forks: 20,
    size: 10
  },
  {
    name: "java-design-patterns",
    stars: 20,
    forks: 14,
    size: 0
  }
];

// SelectableTable Template
const SelectableTableTemplate: ComponentStory<typeof SelectableTable> = (args) => <SelectableTable {...args} />;

// SelectableTable Default
export const Default = SelectableTableTemplate.bind({});
Default.args = {title: "Test Title", tableType: "participants", rows: testRows };
