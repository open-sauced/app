import { PullRequestRow } from "components/PullRequests/PullRequestRow";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "components/shared/Table";
import type { Meta, StoryObj } from "@storybook/react";

type MetaData = Meta<typeof PullRequestRow>;

const meta: MetaData = {
  title: "Components/Pull Requests/PullRequestRow",
  component: PullRequestRow,
  args: {
    repoId: 501028599,
  },
  decorators: [
    (Story) => (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>State</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>PR #</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Repository</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead>Additions</TableHead>
            <TableHead>Deletions</TableHead>
            <TableHead>Changed Files</TableHead>
            <TableHead>Commits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Story />
        </TableBody>
      </Table>
    ),
  ],
};

function getPullRequestData(partialPullRequest: Partial<PullRequest>) {
  return Object.assign(
    {
      event_id: 1,
      pr_number: 1,
      pr_state: "open",
      pr_is_draft: false,
      pr_is_merged: false,
      pr_mergeable_state: "clean",
      pr_is_rebaseable: true,
      pr_title: "feat: added awesome feature",
      pr_head_label: "head",
      pr_base_label: "base",
      pr_head_ref: "head-ref",
      pr_base_ref: "base-ref",
      pr_author_login: "brandonroberts",
      pr_created_at: "2021-01-01",
      pr_closed_at: "2021-01-02",
      pr_merged_at: "2021-01-03",
      pr_updated_at: "2021-01-04",
      pr_comments: 1,
      pr_additions: 1,
      pr_deletions: 1,
      pr_changed_files: 1,
      repo_name: "open-sauced/app",
      pr_commits: 1,
    },
    partialPullRequest
  ) satisfies DbRepoPREvents;
}

export default meta;
type Story = StoryObj<typeof PullRequestRow>;

export const OpenPR: Story = {
  args: {
    pullRequest: getPullRequestData({
      pr_state: "open",
    }),
  },
};

export const MergedPR: Story = {
  args: {
    pullRequest: getPullRequestData({
      pr_is_merged: true,
      pr_state: "closed",
    }),
  },
};

export const ClosedPR: Story = {
  args: {
    pullRequest: getPullRequestData({
      pr_is_merged: false,
      pr_state: "closed",
    }),
  },
};

export const DraftPR: Story = {
  args: {
    pullRequest: getPullRequestData({
      pr_state: "open",
      pr_is_draft: true,
    }),
  },
};
