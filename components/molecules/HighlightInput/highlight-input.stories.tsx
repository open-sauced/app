import { Meta, StoryObj } from "@storybook/react";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";

const storyConfig = {
  title: "Design System/molecules/HighlightInputForm",
  component: HighlightInputForm,
} satisfies Meta<typeof HighlightInputForm>;
export default storyConfig;

type Story = StoryObj<typeof HighlightInputForm>;

export const Default: Story = {};
