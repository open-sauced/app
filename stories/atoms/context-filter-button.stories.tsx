import { ComponentStory } from "@storybook/react";
import ContextFilterButton from "components/atoms/ContextFilterButton/context-filter-button";

const storyConfig = {
  title: "Design System/Atoms/ContextFilterButton"
};
export default storyConfig;

const ContextFilterButtonTemplate: ComponentStory<typeof ContextFilterButton> = (args) => (
  <ContextFilterButton {...args} />
);
export const Default = ContextFilterButtonTemplate.bind({});

Default.args = {
  children: <div>Text</div>
};
