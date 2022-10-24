import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextInput from "components/atoms/TextInput/text-input";

const storyConfig = {
  title: "Design System/Atoms/Text Input",
  component: "TextInput"
};

export default storyConfig;

//TextInput Template
const TextInputTemplate: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = TextInputTemplate.bind({});

Default.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  type: "text",
  borderless: false,
  descriptionText: "Test",
  label: "Test"
};