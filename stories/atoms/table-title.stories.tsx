import { ComponentStory } from "@storybook/react";
import TableTitle from "components/atoms/TableTitle/table-title";

const storyConfig = {
  title: "Design System/Atoms/TableTitle",
  component: "TableTitle"
};

export default storyConfig;

//Title Template
const TableTitleTemplate: ComponentStory<typeof TableTitle> = (args) => <TableTitle {...args} />;

export const Default = TableTitleTemplate.bind({});

Default.args = {
  text: "Some text"
};