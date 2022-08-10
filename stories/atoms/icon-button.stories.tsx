import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import IconButton from "../../components/atoms/IconButton/icon-button";

const storyConfig = {
  title: "Design System/Atoms/Icon Button",
  component: "Icon Button"
};

export default storyConfig;

//IconButton Template
const IconButtonTemplate: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Default = IconButtonTemplate.bind({});
Default.args = {  };