import { IssueClosedIcon, IssueOpenedIcon, IssueReopenedIcon } from "@primer/octicons-react";
import Link from "next/link";
import { Avatar } from "components/atoms/Avatar/avatar-hover-card";

type IssueState = DbRepoIssueEvents["issue_state"];

function getPullRequestStateIcon(state: IssueState) {
  const size = 14;

  switch (state) {
    case "open":
      return <IssueOpenedIcon aria-label="open pull request" size={size} className="text-white" />;

    case "reopened":
      return <IssueReopenedIcon aria-label="open pull request" size={size} className="text-white" />;

    case "closed":
      return <IssueClosedIcon size={size} aria-label="closed pull request" className="text-white" />;
  }
}

export const IssueStateAuthorIcon = ({ state, author }: { state: IssueState; author: string }) => {
  let backgroundColor = "";

  switch (state) {
    case "open":
      backgroundColor = "bg-green-600";
      break;

    case "reopened":
      backgroundColor = "bg-green-600";
      break;
    case "closed":
      backgroundColor = "bg-purple-600";
      break;
  }

  return (
    <div className="relative w-max">
      <Link href={`/user/${author}`} title={`User profile for ${author}`}>
        <Avatar contributor={author} size="medium" />
      </Link>
      <div
        className={`absolute -bottom-[10px] -right-[12px] p-1 border-[2px] border-white  rounded-full [&_svg]:absolute [&_svg]:top-[3.5px] [&_svg]:left-[3.5px] ${backgroundColor}`}
        style={{ width: "25px", height: "25px" }}
      >
        {getPullRequestStateIcon(state)}
      </div>
    </div>
  );
};
