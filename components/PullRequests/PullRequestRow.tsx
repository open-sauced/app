import { GitMergeIcon, GitPullRequestIcon } from "@primer/octicons-react";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";
import { TableCell, TableRow } from "components/shared/Table";

interface PullRequestRowProps {
  pullRequest: PullRequest;
  repoId: number;
}

export type PullRequest = {
  event_id: number;
  pr_number: number;
  pr_state: "open" | "closed";
  pr_is_draft: boolean;
  pr_is_merged: boolean;
  pr_mergeable_state: string;
  pr_is_rebaseable: boolean;
  pr_title: string;
  pr_head_label: string;
  pr_base_label: string;
  pr_head_ref: string;
  pr_base_ref: string;
  pr_author_login: string;
  pr_created_at: string;
  pr_closed_at: string;
  pr_merged_at: string;
  pr_updated_at: string;
  pr_comments: number;
  pr_additions: number;
  pr_deletions: number;
  pr_changed_files: number;
  repo_name: string;
  pr_commits: number;
};

function getPullRequestStateIcon(
  state: PullRequest["pr_state"],
  isDraft: PullRequest["pr_is_draft"],
  isMerged: PullRequest["pr_is_merged"]
) {
  switch (true) {
    case state === "open" && !isDraft:
      return <GitPullRequestIcon size={24} className="text-green-600" />;
    case state === "open" && isDraft:
      return <GitPullRequestIcon size={24} className="text-slate-600" />;
    case state === "closed" && !isMerged:
      return <GitPullRequestIcon size={24} className="text-red-600" />;
    case state === "closed" && isMerged:
      return <GitMergeIcon size={24} className="text-purple-600 h-8 w-8" />;
  }
}

export const PullRequestRow = ({ pullRequest, repoId }: PullRequestRowProps) => {
  return (
    <TableRow>
      <TableCell>
        {getPullRequestStateIcon(pullRequest.pr_state, pullRequest.pr_is_draft, pullRequest.pr_is_merged)}
      </TableCell>
      <TableCell>
        {/* TODO pass in repo info to get the repo number ID */}
        <AvatarHoverCard contributor={pullRequest.pr_author_login} repositories={[repoId]} size="large" />
      </TableCell>
      <TableCell>{pullRequest.pr_number}</TableCell>
      <TableCell>{pullRequest.pr_title}</TableCell>
      <TableCell>{pullRequest.repo_name}</TableCell>
      <TableCell>{pullRequest.pr_created_at}</TableCell>
      <TableCell>{pullRequest.pr_closed_at}</TableCell>
      <TableCell>{pullRequest.pr_merged_at}</TableCell>
      <TableCell>{pullRequest.pr_updated_at}</TableCell>
      <TableCell>{pullRequest.pr_comments}</TableCell>
      <TableCell>{pullRequest.pr_additions}</TableCell>
      <TableCell>{pullRequest.pr_deletions}</TableCell>
      <TableCell>{pullRequest.pr_changed_files}</TableCell>
      <TableCell>{pullRequest.pr_commits}</TableCell>
    </TableRow>
  );
};
