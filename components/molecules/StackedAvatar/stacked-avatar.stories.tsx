import { Meta, StoryObj } from "@storybook/react";
import StackedAvatar from "components/molecules/StackedAvatar/stacked-avatar";
import { mockDbContributions } from "../../../.storybook/testData/mockedData";

const storyConfig = {
  title: "Design System/Molecules/Stacked Avatar",
  component: StackedAvatar,
} satisfies Meta<typeof StackedAvatar>;
export default storyConfig;

type Story = StoryObj<typeof StackedAvatar>;

export const Default: Story = {
  args: {
    contributors: mockDbContributions,
  },
};
