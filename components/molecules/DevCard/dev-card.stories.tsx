import { Meta, StoryObj } from "@storybook/react";
import { STUB_DEV_CARDS } from "components/organisms/DevCardCarousel/stubData";
import DevCard from "./dev-card";

type Story = StoryObj<typeof DevCard>;

const meta: Meta<typeof DevCard> = {
  title: "Design System/Molecules/DevCard",
  component: DevCard,
  args: {
    devstats: STUB_DEV_CARDS[0],
    isLoading: false,
    error: undefined,
  },
};

export default meta;

export const Default: Story = {
  args: {
    devstats: STUB_DEV_CARDS[0],
    isLoading: false,
    error: undefined,
  },
};

export const LoadingState: Story = {
  args: {
    devstats: undefined,
    isLoading: true,
    error: undefined,
  },
};

export const ErrorState: Story = {
  args: {
    devstats: undefined,
    isLoading: false,
    error: new Error(),
  },
};
