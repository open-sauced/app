import { Meta, StoryObj } from "@storybook/react";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";

type Story = StoryObj<typeof PickReposOrOrgStep>;

const meta: Meta<typeof PickReposOrOrgStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/PickReposOrOrgStep",
  component: PickReposOrOrgStep,
  args: {
    trackedReposCount: 0,
    onSearchRepos: () => {},
    onImportOrg: () => {},
    onCancel: () => {},
  },
};

export default meta;

export const Default: Story = {};

export const SelectedRepositories: Story = {
  args: {
    trackedReposCount: 543,
  },
};
