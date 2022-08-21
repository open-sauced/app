import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectableTable from "../../components/molecules/SelectableTable/repo-table";

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
    persons: 5,
    size: "30984"
  },
  {
    name: "free-programming-books",
    stars: 60,
    forks: 10,
    persons: 5,
    size: "30984"
  },
  {
    name: "material-ui",
    stars: 20,
    forks: 30,
    persons: 2,
    size: "30984"
  },
  {
    name: "react",
    stars: 100,
    forks: 20,
    persons: 10,
    size: "30984"
  },
  {
    name: "java-design-patterns",
    stars: 20,
    forks: 14,
    persons: 0,
    size: "30984"
  }
];

// SelectableTable Template
const SelectableTableTemplate: ComponentStory<typeof SelectableTable> = (args) => <SelectableTable {...args} />;

// SelectableTable Default
export const Default = SelectableTableTemplate.bind({});
Default.args = {title: "Test Title", tableType: "participants", rows: testRows };
