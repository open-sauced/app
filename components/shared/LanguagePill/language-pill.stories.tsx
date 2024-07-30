import { Meta, StoryObj } from "@storybook/react";
import LanguagePill from "components/shared/LanguagePill/LanguagePill";

type Story = StoryObj<typeof LanguagePill>;

const meta: Meta<typeof LanguagePill> = {
  title: "Components/Shared/LanguagePill",
  component: LanguagePill,
  args: {
    language: "javascript",
  },
};

export default meta;

export const Default: Story = {};
