import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectableTable from "../../components/molecules/SelectableTable/selectable-table";


const storyConfig = {
  title: "Design System/Molecules/Selectable Table",
  component: "SelectableTable"
};

export default storyConfig;


// SelectableTable Template
const SelectableTableTemplate: ComponentStory<typeof SelectableTable> = (args) => <SelectableTable {...args} />;

// SelectableTable Default
export const Default = SelectableTableTemplate.bind({});
Default.args = {title: "Test Title" };