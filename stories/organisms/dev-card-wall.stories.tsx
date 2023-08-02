import type { Meta, StoryObj } from "@storybook/react";
import DevCardWall from "../../components/organisms/DevCardWall/dev-card-wall";

const cards = Array.from({ length: 10 }, (_, i) => ({
  username: `test${i}`,
  name: "test",
  avatarURL: "https://avatars.githubusercontent.com/u/54212428?v=4",
}));

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
