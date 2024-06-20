import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StarSearchButton } from "./StarSearchButton";

type Story = StoryObj<typeof StarSearchButton>;

const meta: Meta<typeof StarSearchButton> = {
  title: "Components/StarSearch/StarSearchButton",
  component: StarSearchButton,
  args: {
    onOpen: () => {
      action("openHandler")();
    },
  },
  decorators: [(story) => <div className="grid w-26 h-96 place-content-center">{story()}</div>],
};

export default meta;

export const Default: Story = {};
