import { Meta, StoryObj } from "@storybook/react";
import { SearchByReposStep } from "./SearchByReposStep";

type Story = StoryObj<typeof SearchByReposStep>;

const meta: Meta<typeof SearchByReposStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/SearchByReposStep",
  component: SearchByReposStep,
  args: {
    repositories: new Map(),
    searchedRepos: [],
    suggestedRepos: [],
  },
};

export default meta;

export const Default: Story = {};

export const HasTrackedRepos: Story = {
  args: {
    repositories: new Map(new Array(100).fill("").map((_, i) => [`open-sauced/awesome-pizza-project-${i}`, true])),
  },
};

export const HasSuggestedRepos: Story = {
  args: {
    repositories: new Map(),
    suggestedRepos: new Array(3).fill("").map((_, i) => `open-sauced/awesome-pizza-project-${i}`),
  },
};
