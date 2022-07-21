import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContextFilter from "../../components/atoms/ContextFilter/context-filter";
import Thumbnail from "../../public/hacktoberfest-icon.png";

const storyConfig = {
  title: "Design System/Atoms/Context Filter",
  component: "ContextFilter"
};

export default storyConfig;

//ContextFilter Template
const ContextFilterTemplate: ComponentStory<typeof ContextFilter> = (args) => <ContextFilter {...args} />;

export const Default = ContextFilterTemplate.bind({});

Default.args = {};