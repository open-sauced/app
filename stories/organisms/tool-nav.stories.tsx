import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Nav from "../../components/organisms/toolist/nav";

const storyConfig = {
  title: "Design System/Organisms/Tools Nav",
  component: "Tool List Nav"
};

export default storyConfig;

const testTools = [
  {
    name: "test 1"
  },
  {
    name: "test 2",
    numOf: 3
  }
];

//ToolNav Template
const ToolNavTemplate: ComponentStory<typeof Nav> = (args) => <Nav {...args}/>;

//Default ToolNav
export const Default = ToolNavTemplate.bind({});
Default.args = { portalName: "test", selectedTool: "test 1", toolList: testTools };