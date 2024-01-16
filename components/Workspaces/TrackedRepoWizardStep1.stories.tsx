import { Meta, StoryObj } from "@storybook/react";
import { TrackedRepoWizard } from "./TrackedRepoWizardStep1";

type Story = StoryObj<typeof TrackedRepoWizard>;

const meta: Meta<typeof TrackedRepoWizard> = {
  title: "Components/Workspaces/TrackedRepoWizardStep1",
  component: TrackedRepoWizard,
  args: {
    trackedReposCount: 0,
    onAddToTrackingList: () => {},
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
