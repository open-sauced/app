import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RepositoriesTable from "../../components/molecules/RepositoriesTable/repositories-table";

const storyConfig = {
  title: "Design System/Molecules/Repositories Table",
  component: "RepositoriesTable"
};

export default storyConfig;

// SelectableTable Template
const RepositoriesTableTemplate: ComponentStory<typeof RepositoriesTable> = (args) => <RepositoriesTable {...args} />;

// SelectableTable Default
export const Default = RepositoriesTableTemplate.bind({});

const previewRepositories = [
  {
    name: "Insights",
    handle: "opensauced"
  },
  {
    name: "cli",
    handle: "npm"
  },
  {
    name: "flowy",
    handle: "alyssaxuu"
  },
];

Default.args = {
  listOfRepositories: previewRepositories
};
