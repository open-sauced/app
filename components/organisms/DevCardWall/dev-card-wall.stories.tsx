import { Meta, StoryObj } from "@storybook/react";
import DevCardWall from "./dev-card-wall";

type Story = StoryObj<typeof DevCardWall>;

const meta: Meta<typeof DevCardWall> = {
  title: "Design System/Organisms/DevCardWall",
  component: DevCardWall,
  args: {
    usernames: ["zeucapua", "nickytonline", "brandonroberts"],
    isLoading: false,
  },
};

export default meta;

export const Default: Story = {
  args: {
    usernames: ["zeucapua", "nickytonline", "brandonroberts"],
    isLoading: false,
  },
};

export const LoadingState: Story = {
  args: {
    usernames: undefined,
    isLoading: true,
  },
};
