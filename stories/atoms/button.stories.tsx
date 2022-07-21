import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../../components/atoms/Button/button";

const storyConfig = {
  title: "Design System/Atoms/Button",
  argTypes: {
    type: {
      options: ["primary", "outline", "default", "link"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const Default = ButtonTemplate.bind({});
Default.args = { type: "primary" };