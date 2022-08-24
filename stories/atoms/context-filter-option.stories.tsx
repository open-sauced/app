import ContextFilterOption from "components/atoms/ContextFilterOption/context-filter-option";
import { ComponentStory, ComponentMeta } from "@storybook/react";

const storyConfig = {
  title: "Design System/Atoms/ContextFilterOption"
};
export default storyConfig;

const ContextFilterOptionTemplate: ComponentStory<typeof ContextFilterOption> = (args) => (
  <ContextFilterOption {...args} />
);
export const Default = ContextFilterOptionTemplate.bind({});
export const Selected = ContextFilterOptionTemplate.bind({});
Default.args = {
  children: <div>Have &gt;5 contributors</div>
};
Selected.args = {
  children: <div>Have &gt;5 contributors</div>,
  isSelected: true
};
