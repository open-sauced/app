import { OscrRating } from "components/Contributors/OscrRating";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof OscrRating>;

const meta: MetaData = {
  title: "Components/Contributors/OscrRating",
  component: OscrRating,
  args: {
    rating: 0.5,
  },
};

export default meta;
type Story = StoryObj<typeof OscrRating>;

export const Default: Story = {};
