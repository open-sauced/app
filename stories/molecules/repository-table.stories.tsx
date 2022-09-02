import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RepositoryTable from "../../components/molecules/RepositoryTable/repository-table";

const storyConfig = {
  title: "Design System/Molecules/Repository Table",
  component: "RepositoryTable"
};

export default storyConfig;

const testRows = [
  {
    name: "freecodecamp",
    stars: 100,
    size: 30984
  },
  {
    name: "free-programming-books",
    stars: 60,
    size: 30984
  },
  {
    name: "material-ui",
    stars: 20,
    size: 30984
  },
  {
    name: "react",
    stars: 100,
    size: 30984
  },
  {
    name: "java-design-patterns",
    stars: 20,
    size: 30984
  }
];

// SelectableTable Template
const RepositoryTableTemplate: ComponentStory<typeof RepositoryTable> = (args) => <RepositoryTable {...args} />;

// SelectableTable Default
export const Default = RepositoryTableTemplate.bind({});
Default.args = {title: "Test Title", tableType: "participants", rows: testRows };
