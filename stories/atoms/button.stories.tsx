import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "../../components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import ForkIcon from "public/icons/fork-icon.svg";

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

export const ButtonTypes: ComponentStory<typeof Button> = (args) => (
  <div className="flex gap-2">
    <Button type="default">
      Default Button
    </Button>
    <Button type="primary">
      Primary Button
    </Button>
    <Button type="outline">
      Outline Button
    </Button>
    <Button type="link">
      Link Button
    </Button>
  </div>
);

export const Default = ButtonTemplate.bind({});
Default.args = { type: "default" };

export const Primary = ButtonTemplate.bind({});
Primary.args = { type: "primary" };

export const Outline = ButtonTemplate.bind({});
Outline.args = { type: "outline" };

export const Link = ButtonTemplate.bind({});
Link.args = { type: "link" };

export const HasIcons: ComponentStory<typeof Button> = (args) => (
  <div className="flex flex-wrap gap-2">
    <Button type="default" icon={<Icon IconImage={ForkIcon.src}></Icon>}>
      Icon Left
    </Button>
    <Button type="default" iconRight={<Icon IconImage={ForkIcon.src}></Icon>}>
      Icon Right
    </Button>
  </div>
);