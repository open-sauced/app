import { ComponentStory } from "@storybook/react";
import Button from "./button";

const storyConfig = {
  title: "Design System/Buttons/Button",
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
    <Button variant="destructive">Destructive Button</Button>
  </div>
);

export const Default = ButtonTemplate.bind({});
Default.args = { variant: "default" };

export const DefaultDisabled = ButtonTemplate.bind({});
DefaultDisabled.args = { variant: "default", disabled: true };

export const Primary = ButtonTemplate.bind({});
Primary.args = { variant: "primary" };

export const PrimaryDisabled = ButtonTemplate.bind({});
PrimaryDisabled.args = { variant: "primary", disabled: true };

export const Dark = ButtonTemplate.bind({});
Dark.args = { variant: "dark" };

export const DarkDisabled = ButtonTemplate.bind({});
DarkDisabled.args = { variant: "dark", disabled: true };

export const Outline = ButtonTemplate.bind({});
Outline.args = { variant: "outline" };

export const OutlineDisabled = ButtonTemplate.bind({});
OutlineDisabled.args = { variant: "outline", disabled: true };

export const Link = ButtonTemplate.bind({});
Link.args = { variant: "link" };

export const Destructive = ButtonTemplate.bind({});
Destructive.args = { variant: "destructive" };

export const DestructiveDisabled = ButtonTemplate.bind({});
DestructiveDisabled.args = { variant: "destructive", disabled: true };

export const IsLoading = ButtonTemplate.bind({});
IsLoading.args = { variant: "primary", loading: true };

export const IsLoadingCustomText = ButtonTemplate.bind({});
IsLoadingCustomText.args = { variant: "primary", loading: true, loadingText: "Custom Loading Text..." };

export const HasIcons: ComponentStory<typeof Button> = (args) => (
  <div className="flex flex-wrap gap-2">
    <Button variant="default">Icon Left</Button>
    <Button variant="default">Icon Right</Button>
  </div>
);
