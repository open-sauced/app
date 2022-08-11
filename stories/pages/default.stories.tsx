import { ComponentStory, ComponentMeta } from "@storybook/react";
import Tool from "components/organisms/ToolsDisplay/tools-display";
import FilterLayout from "layouts/filter";

const storyConfig = {
  title: "Design System/Pages/Filter",

  argTypes: {
    tool: {
      options: ["Dashboard", "Reports", "Activity", "Repositories", "Contributors"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;

const SelectedFilterTemplate: ComponentStory<typeof Tool> = (args) => 
  <FilterLayout>
    <Tool {...args} />
  </FilterLayout>;

export const SelectedTool = SelectedFilterTemplate.bind({});
SelectedTool.args = { tool: "Dashboard" };