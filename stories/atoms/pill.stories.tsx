import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Pill from "components/atoms/Pill/pill";

const storyConfig = {
  title: "Design System/Atoms/Pill",
  component: "Pill",
  argTypes: {
    color: {
      options: ["slate", "green", "yellow", "red"],
      control: { type: "select" }
    },
    size: {
      options: ["base", "small"],
      control: { type: "select" }
    }
  }
};

export default storyConfig;

//Pill Template
const PillTemplate: ComponentStory<typeof Pill> = (args) => <Pill {...args} />;

export const Default = PillTemplate.bind({});

Default.args = {
  text: "+150%",
  color: "green",
  size: "base"
};