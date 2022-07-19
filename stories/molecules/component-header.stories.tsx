import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ComponentHeader from "../../components/molecules/ComponentHeader/component-header";

const storyConfig = {
  title: "Design System/Molecules/Component Header",
  component: "ComponentHeader"
};

export default storyConfig;

// ComponentHeader Template
const ComponentHeaderTemplate: ComponentStory<typeof ComponentHeader> = (args) => <ComponentHeader {...args} />;

// ComponentHeader Default
export const Default = ComponentHeaderTemplate.bind({});
Default.args = {title: "Test Title" };