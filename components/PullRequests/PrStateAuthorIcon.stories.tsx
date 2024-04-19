import { Meta, StoryObj } from "@storybook/react";
import { PrStateAuthorIcon } from "./PrStateAuthorIcon";

type Story = StoryObj<typeof PrStateAuthorIcon>;

const meta: Meta<typeof PrStateAuthorIcon> = {
  title: "Components/PullRequests/PrStateAuthorIcon",
  component: PrStateAuthorIcon,
  args: {
    author: "brandonroberts",
  },
};

export default meta;

export const OpenPR: Story = {
  args: {
    state: "open",
    isDraft: false,
    isMerged: false,
  },
};

export const ClosedPR: Story = {
  args: {
    state: "closed",
    isDraft: false,
    isMerged: false,
  },
};

export const DraftPR: Story = {
  args: {
    state: "open",
    isDraft: true,
    isMerged: false,
  },
};

export const MergedPR: Story = {
  args: {
    state: "closed",
    isDraft: false,
    isMerged: true,
  },
};
