import { GitMergeIcon, GitPullRequestClosedIcon, GitPullRequestIcon } from "@primer/octicons-react";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";

function getPullRequestStateIcon(
  state: DbRepoPREvents["pr_state"],
  isDraft: DbRepoPREvents["pr_is_draft"],
  isMerged: DbRepoPREvents["pr_is_merged"]
) {
  const size = 14;

  switch (true) {
    case state === "open" && !isDraft:
      return <GitPullRequestIcon aria-label="open pull request" size={size} className="text-white" />;
    case state === "open" && isDraft:
      return <GitPullRequestIcon size={size} aria-label="draft pull request" className="text-white" />;
    case state === "closed" && !isMerged:
      return <GitPullRequestClosedIcon size={size} aria-label="closed pull request" className="text-white" />;
    case state === "closed" && isMerged:
      return <GitMergeIcon size={size} aria-label="merged pull request" className="text-white" />;
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
  let backgroundColor = "";

  switch (true) {
    case state === "open" && !isDraft:
      backgroundColor = "bg-green-600";
      break;

    case state === "open" && isDraft:
      backgroundColor = "bg-slate-600";
      break;
    case state === "closed" && !isMerged:
      backgroundColor = "bg-red-600";
      break;
    case state === "closed" && isMerged:
      backgroundColor = "bg-purple-600";
      break;
  }

  return (
    <div className="relative w-max">
      <Avatar contributor={author} size="medium" />
      <div
        className={`absolute -bottom-[10px] -right-[12px] p-1 border-[2px] border-white  rounded-full [&_svg]:absolute [&_svg]:top-[3.5px] [&_svg]:left-[3.5px] ${backgroundColor}`}
        style={{ width: "25px", height: "25px" }}
      >
        {getPullRequestStateIcon(state, isDraft, isMerged)}
      </div>
    </div>
  );
};
