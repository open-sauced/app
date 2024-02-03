import { Meta, StoryObj } from "@storybook/react";
import { SearchReposByOrgStep } from "./SearchReposByOrgStep";

type Story = StoryObj<typeof SearchReposByOrgStep>;

const meta: Meta<typeof SearchReposByOrgStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/SearchReposByOrgStep",
  component: SearchReposByOrgStep,
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
    organization: "open-sauced",
    repositories: new Map(new Array(100).fill("").map((_, i) => [`open-sauced/awesome-pizza-project-${i}`, true])),
  },
};

export const HasSuggestedRepos: Story = {
  args: {
    repositories: new Map(),
    suggestedRepos: new Array(3).fill("").map((_, i) => `open-sauced/awesome-pizza-project-${i}`),
  },
};
