import { Meta, StoryObj } from "@storybook/react";
import { SearchByReposStep } from "./SearchByReposStep";

type Story = StoryObj<typeof SearchByReposStep>;

const meta: Meta<typeof SearchByReposStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/SearchByReposStep",
  component: SearchByReposStep,
  args: {
    trackedReposCount: 0,
    onAddToTrackingList: () => {},
    onCancel: () => {},
    repositories: [],
    suggestedRepos: [],
  },
};

export default meta;

export const Default: Story = {};

export const HasTrackedRepos: Story = {
  args: {
    repositories: new Array(100).fill("").map((_, i) => ({
      owner: "open-sauced",
      name: `awesome-pizza-project-${i}`,
    })),
    trackedReposCount: 4,
    suggestedRepos: new Array(5).fill("").map((_, i) => ({
      owner: "open-sauced",
      name: `awesome-pizza-project-${i}`,
    })),
  },
};
