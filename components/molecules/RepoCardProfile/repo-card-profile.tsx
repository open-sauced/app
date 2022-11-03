import Avatar from "components/atoms/Avatar/avatar";
import { StaticImageData } from "next/image";
import React from "react";
import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";

export interface RepoCardProfileProps {
  avatar?: string | StaticImageData;
  orgName?: string;
  repoName?: string;
  prCount?: number;
  issueCount?: number;
  className?: string;
}
const RepoCardProfile = ({ avatar, orgName, repoName, prCount, issueCount }: RepoCardProfileProps) => {
  return (
    <div className="flex gap-3 ">
      <div>
        <Avatar size={40} avatarURL={avatar} />
      </div>
      <div className="flex flex-col gap-1 h-10">
        <div className="text-base">
          <p className="text-light-slate-11 -mt-1">
            {orgName} / <span className="text-light-slate-12">{repoName}</span>
          </p>
        </div>
        <div className="flex text-light-slate-10 gap-3">
          <span className="flex text-xs gap-0.5 items-center">
            <VscIssues className="text-[15px]" /> {issueCount}
          </span>
          <span className="flex gap-0.5 text-xs items-center">
            <BiGitPullRequest className="text-[15px]" /> {prCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RepoCardProfile;
