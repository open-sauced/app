import { Meta, StoryObj } from "@storybook/react";
import { PickReposOrOrgStep } from "./PickReposOrOrgStep";

type Story = StoryObj<typeof PickReposOrOrgStep>;

const meta: Meta<typeof PickReposOrOrgStep> = {
  title: "Components/Workspaces/TrackedRepoWizard/PickReposOrOrgStep",
  component: PickReposOrOrgStep,
  args: {
    onSearchRepos: () => {},
    onImportOrg: () => {},
  },
};

export default meta;

export const Default: Story = {};
