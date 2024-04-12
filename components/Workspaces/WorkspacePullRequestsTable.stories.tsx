import { Meta, StoryObj } from "@storybook/react";
import { WorkspacePullRequestTable } from "./WorkspacePullRequestsTable";

type Story = StoryObj<typeof WorkspacePullRequestTable>;

const meta: Meta<typeof WorkspacePullRequestTable> = {
  title: "Components/Workspaces/Pull Request Table",
  component: WorkspacePullRequestTable,
  args: {
    data: null,
    isLoading: true,
    meta: null,
  },
};

export default meta;

export const Loading: Story = {
  args: {},
};
