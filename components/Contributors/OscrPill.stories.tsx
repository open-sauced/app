import { OAuthResponse } from "@supabase/supabase-js";
import { OscrPill } from "components/Contributors/Oscr";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof OscrPill>;

const meta: MetaData = {
  title: "Components/Contributors/OscrPill",
  component: OscrPill,
  args: {
    signIn: (options) => Promise.resolve({} as OAuthResponse),
    rating: 0.5,
    calculated: true,
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

export const NotCalculated: Story = {
  args: {
    calculated: false,
  },
};
