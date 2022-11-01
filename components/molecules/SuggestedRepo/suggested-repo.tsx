import React from "react";
import { StaticImageData } from "next/image";

import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";

import Button from "components/atoms/Button/button";
import Avatar from "components/atoms/Avatar/avatar";

interface SuggestedRopsitoryProps {
  avatar?: string | StaticImageData;
  orgName?: string;
  repoName?: string;
  prCount?: number;
  issueCount?: number;
}
const SuggestedRepository = ({ avatar, orgName, repoName, prCount, issueCount }: SuggestedRopsitoryProps) => {
  // Utilizing static data for testing purpose until real data is available
  return (
    <div className="flex justify-between items-center">
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
      <Button type="text" className="!border !border-light-slate-6 !shadow-input">
        Add to Page
      </Button>
    </div>
  );
};

export default SuggestedRepository;
