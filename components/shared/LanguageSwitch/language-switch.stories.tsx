import { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitch } from "./language-switch";

type Story = StoryObj<typeof LanguageSwitch>;

const meta: Meta<typeof LanguageSwitch> = {
  title: "Components/Shared/LanguageSwitch",
  component: LanguageSwitch,
  args: {
    topic: "javascript",
    checked: false,
    onClick: () => {
      // eslint-disable-next-line no-console
      console.log("clicked");
    },
  },
};

export default meta;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};
