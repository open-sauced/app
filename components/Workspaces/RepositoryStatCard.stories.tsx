import { Meta, StoryObj } from "@storybook/react";
import { RepositoryStatCard } from "./RepositoryStatCard";

type Story = StoryObj<typeof RepositoryStatCard>;

const meta: Meta<typeof RepositoryStatCard> = {
  title: "Components/Workspaces/Repository Stat Card",
  component: RepositoryStatCard,
  args: {
    isLoading: false,
    hasError: false,
  },
};

export default meta;

export const PullRequests: Story = {
  args: {
    type: "pulls",
    stats: { opened: 10, merged: 5, velocity: 2 },
  },
};

export const Error: Story = {
  args: {
    type: "pulls",
    hasError: true,
  },
};

export const Issues: Story = {
  args: {
    type: "issues",
    stats: { opened: 10, closed: 5, velocity: 0.5 },
  },
};

export const Engagement: Story = {
  args: {
    type: "engagement",
    stats: { stars: 10, forks: 5, activity_ratio: 2 },
  },
};

export const PullRequestsLoading: Story = {
  args: {
    type: "pulls",
    isLoading: true,
  },
};

export const IssuesLoading: Story = {
  args: {
    type: "issues",
    isLoading: true,
  },
};

export const EngagementLoading: Story = {
  args: {
    type: "engagement",
    isLoading: true,
  },
};
