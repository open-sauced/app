import { Meta, StoryObj } from "@storybook/react";
import { IssueStateAuthorIcon } from "../Issues/IssueStateAuthorIcon";

type Story = StoryObj<typeof IssueStateAuthorIcon>;

const meta: Meta<typeof IssueStateAuthorIcon> = {
  title: "Components/PullRequests/IssueStateAuthorIcon",
  component: IssueStateAuthorIcon,
  args: {
    author: "brandonroberts",
  },
};

export default meta;

export const OpenPR: Story = {
  args: {
    state: "open",
  },
};

export const ClosedPR: Story = {
  args: {
    state: "closed",
  },
};

export const Reopened: Story = {
  args: {
    state: "reopened",
  },
};
