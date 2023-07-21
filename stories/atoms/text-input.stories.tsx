import React from "react";
import { ComponentStory } from "@storybook/react";
import TextInput from "components/atoms/TextInput/text-input";

const storyConfig = {
  title: "Design System/Atoms/Text Input",
  component: "TextInput",
};

export default storyConfig;

//TextInput Template
const TextInputTemplate: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = TextInputTemplate.bind({});
export const WithLabel = TextInputTemplate.bind({});
export const WithDescriptionText = TextInputTemplate.bind({});
export const IsInvalid = TextInputTemplate.bind({});
export const IsValid = TextInputTemplate.bind({});
Default.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  borderless: false,
};
WithLabel.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  borderless: false,
  label: "Input label",
};
WithDescriptionText.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  borderless: false,
  descriptionText: "insights.opensauced.pizza/statelyai/slug",
};

IsInvalid.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  borderless: false,
  state: "invalid",
  errorMsg: "An error occured !!!",
};
IsValid.args = {
  placeholder: "Test",
  disabled: false,
  autoFocus: true,
  borderless: false,
  state: "valid",
};
