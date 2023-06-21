import { ComponentStory } from "@storybook/react";
import Button from "../../components/atoms/Button/button";

const storyConfig = {
  title: "Design System/Atoms/Button",
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    type: {
      options: ["primary", "outline", "default", "dark", "link"],
      control: { type: "select" },
    },
  },
};

export default storyConfig;

const ButtonTemplate: ComponentStory<typeof Button> = (args) => <Button {...args}>Button</Button>;

export const ButtonTypes: ComponentStory<typeof Button> = (args) => (
  <div className="flex gap-2">
    <Button variant="default">Default Button</Button>
    <Button variant="primary">Primary Button</Button>
    <Button variant="outline">Outline Button</Button>
    <Button variant="link">Link Button</Button>
  </div>
);

export const Default = ButtonTemplate.bind({});
Default.args = { variant: "default" };

export const Primary = ButtonTemplate.bind({});
Primary.args = { variant: "primary" };

export const Dark = ButtonTemplate.bind({});
Dark.args = { variant: "dark" };

export const Outline = ButtonTemplate.bind({});
Outline.args = { variant: "outline" };

export const Link = ButtonTemplate.bind({});
Link.args = { variant: "link" };

export const HasIcons: ComponentStory<typeof Button> = (args) => (
  <div className="flex flex-wrap gap-2">
    <Button variant="default">Icon Left</Button>
    <Button variant="default">Icon Right</Button>
  </div>
);
