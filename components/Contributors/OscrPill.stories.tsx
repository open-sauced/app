import { OAuthResponse } from "@supabase/supabase-js";
import { OscrPill } from "components/Contributors/Oscr";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof OscrPill>;

const meta: MetaData = {
  title: "Components/Contributors/OscrRating",
  component: OscrPill,
  args: {
    signIn: (options) => Promise.resolve({} as OAuthResponse),
    rating: 0.5,
  },
};

export default meta;
type Story = StoryObj<typeof OscrPill>;

export const Default: Story = {
  args: {
    hideRating: false,
  },
};
export const Blurred: Story = {
  args: {
    hideRating: true,
  },
};
