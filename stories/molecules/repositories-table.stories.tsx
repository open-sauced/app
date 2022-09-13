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
Default.args = {};
