import { ComponentStory } from "@storybook/react";
import TableRepositoryName from "components/molecules/TableRepositoryName/table-repository-name";

const storyConfig = {
  title: "Design System/Molecules/Table Repository Name",
  component: "TableRepositoryName"
};

export default storyConfig;

//TableRepositoryName Template
const TableRepositoryNameTemplate: ComponentStory<typeof TableRepositoryName> = (args) => <TableRepositoryName {...args} />;

export const Default = TableRepositoryNameTemplate.bind({});

Default.args = {
  fullName: "open-sauced/insights"
};