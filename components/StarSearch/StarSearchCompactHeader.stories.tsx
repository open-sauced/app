import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StarSearchCompactHeader } from "./StarSearchCompactHeader";

const meta: Meta<typeof StarSearchCompactHeader> = {
  title: "Components/StarSearch/StarSearchCompactHeader",
  component: StarSearchCompactHeader,
  args: {
    onBack: () => action("onBack")(),
    onNewChat: () => action("onNewChat")(),
    onShowHistory: () => action("onShowHistory")(),
    onClose: () => action("onClose")(),
    // Not sure why I have to explicitly set this to undefined.
    // Without this the share button appears for the default story.
    onShare: undefined,
  },
  decorators: [(story) => <div className="max-w-md ">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof StarSearchCompactHeader>;

export const Default: Story = {};

export const WithShare: Story = {
  args: {
    onShare: () => action("onShare")(),
  },
};
