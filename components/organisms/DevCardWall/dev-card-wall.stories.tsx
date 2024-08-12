import type { Meta, StoryObj } from "@storybook/react";
import { STUB_DEV_CARDS as cards } from "../DevCardCarousel/stubData";
import DevCardWall from "./dev-card-wall";

export default {
  title: "Design System/Organisms/DevCard Wall",
  component: DevCardWall,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [
    (Story) => (
      <div className="grid w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

type Story = StoryObj<typeof DevCardWall>;

export const Default: Story = {
  args: {
    cards: [...cards],
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    cards: [],
    isLoading: true,
  },
};
