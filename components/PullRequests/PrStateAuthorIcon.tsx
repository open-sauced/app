import { GitMergeIcon, GitPullRequestClosedIcon, GitPullRequestIcon } from "@primer/octicons-react";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";

function getPullRequestStateIcon(
  state: DbRepoPREvents["pr_state"],
  isDraft: DbRepoPREvents["pr_is_draft"],
  isMerged: DbRepoPREvents["pr_is_merged"]
) {
  const size = 18;

  switch (true) {
    case state === "open" && !isDraft:
      return <GitPullRequestIcon aria-label="open pull request" size={size} className="text-green-600" />;
    case state === "open" && isDraft:
      return <GitPullRequestIcon size={size} aria-label="draft pull request" className="text-slate-600" />;
    case state === "closed" && !isMerged:
      return <GitPullRequestClosedIcon size={size} aria-label="closed pull request" className="text-red-600" />;
    case state === "closed" && isMerged:
      return <GitMergeIcon size={size} aria-label="merged pull request" className="text-purple-600" />;
  }
}

export const PrStateAuthorIcon = ({
  state,
  isDraft,
  isMerged,
  author,
}: {
  state: string;
  isDraft: boolean;
  isMerged: boolean;
  author: string;
}) => {
  return (
    <div className="relative w-max">
      <Avatar contributor={author} size="medium" />
      <div
        className="absolute -bottom-2 -right-2 p-1 bg-white rounded-full border [&_svg]:absolute [&_svg]:top-[1.5px] [&_svg]:left-[1px]"
        style={{ width: "23px", height: "23px" }}
      >
        {getPullRequestStateIcon(state, isDraft, isMerged)}
      </div>
    </div>
  );
};
