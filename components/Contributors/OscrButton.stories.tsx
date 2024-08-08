import { OAuthResponse } from "@supabase/supabase-js";
import { OscrButton } from "components/Contributors/Oscr";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof OscrButton>;

const meta: MetaData = {
  title: "Components/Contributors/OscrButton",
  component: OscrButton,
  args: {
    signIn: (options) => Promise.resolve({} as OAuthResponse),
    rating: 0.5,
    calculated: true,
  },
};

export default meta;
type Story = StoryObj<typeof OscrButton>;

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
