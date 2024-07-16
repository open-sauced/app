import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StarSearchCompactHeader } from "./StarSearchCompactHeader";

const meta: Meta<typeof StarSearchCompactHeader> = {
  title: "Components/StarSearch/StarSearchCompactHeader",
  component: StarSearchCompactHeader,
  args: {
    onBack: () => action("onBack")(),
    onShare: () => action("onShare")(),
    onNewChat: () => action("onNewChat")(),
    onShowHistory: () => action("onShowHistory")(),
    onClose: () => action("onClose")(),
  },
  decorators: [(story) => <div className="max-w-md ">{story()}</div>],
};

export default meta;

type Story = StoryObj<typeof StarSearchCompactHeader>;

export const PromptView: Story = {
  args: {
    view: "prompt",
  },
};

export const ChatView: Story = {
  args: {
    view: "chat",
  },
};
