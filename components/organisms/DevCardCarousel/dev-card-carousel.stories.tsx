import { Meta, StoryObj } from "@storybook/react";
import DevCardCarousel from "./dev-card-carousel";

type Story = StoryObj<typeof DevCardCarousel>;

const meta: Meta<typeof DevCardCarousel> = {
  title: "Design System/Organisms/DevCardCarousel",
  component: DevCardCarousel,
  args: {
    usernames: ["zeucapua", "nickytonline", "brandonroberts"],
  },
};

export default meta;

export const Default: Story = {
  args: {
    usernames: ["zeucapua", "nickytonline", "brandonroberts"],
  },
};
