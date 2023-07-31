import type { Meta, StoryObj } from "@storybook/react";
import Text from "../../components/atoms/Typography/text";

const meta: Meta<typeof Text> = {
  title: "Design System/Atoms/Typography/Text",
  component: Text,
  argTypes: {
    type: {
      options: ["default", "secondary", "success", "warning", "danger"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Test",
    type: "default",
    strong: false,
    underline: false,
    strikethrough: false,
    mark: false,
    code: false,
    keyboard: false,
    small: false,
    disabled: false,
  },
};

export const KeyboardText: Story = {
  args: {
    ...Default.args,
    keyboard: true,
  },
};

export const CodeText: Story = {
  args: {
    ...Default.args,
    code: true,
  },
};

export const DisbaledText: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const SmallText: Story = {
  args: {
    ...Default.args,
    small: true,
  },
};
