import { Meta, StoryObj } from "@storybook/react";
import { SelectOrgReposStep } from "./SelectOrgReposStep";

type Story = StoryObj<typeof SelectOrgReposStep>;

const meta: Meta<typeof SelectOrgReposStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/Select Org Repos Step",
  component: SelectOrgReposStep,
  args: {
    isLoading: false,
    hasError: false,
    organization: "open-sauced",
    repositories: new Map(new Array(100).fill("").map((_, i) => [`open-sauced/awesome-pizza-project-${i}`, true])),
    onToggleRepo: (repo: string, isSelected: boolean) => {
      // eslint-disable-next-line no-console
      console.log(repo, isSelected);
    },
    onToggleAllRepos: (checked: boolean) => {
      // eslint-disable-next-line no-console
      console.log(checked);
    },
  },
};

export default meta;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
    repositories: new Map(),
  },
};

export const Error: Story = {
  args: {
    hasError: true,
    repositories: new Map(),
  },
};

export const EmptyState: Story = {
  args: {
    repositories: new Map(),
  },
};
