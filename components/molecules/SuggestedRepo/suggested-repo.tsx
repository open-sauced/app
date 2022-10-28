import React from "react";
import { StaticImageData } from "next/image";

import { BiGitPullRequest } from "react-icons/bi";
import { VscIssues } from "react-icons/vsc";

import Button from "components/atoms/Button/button";
import Avatar from "components/atoms/Avatar/avatar";

interface SuggestedRopsitoryProps {
  avatar?: string | StaticImageData;
  orgName?: string;
  repoName: string;
  prCount?: number;
  issueCount?: number;
}
const SuggestedRepository = ({ avatar, orgName, repoName, prCount, issueCount }: SuggestedRopsitoryProps) => {
  // Utilizing static data for testing purpose until real data is available
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 ">
        <div>
          <Avatar
            size="lg"
            avatarURL="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-base">
            <p className="text-light-slate-11">
              statelyai / <span className="text-light-slate-12">xstate</span>
            </p>
          </div>
          <div className="flex text-light-slate-10 gap-3">
            <span className="flex text-xs gap-0.5 items-center">
              <VscIssues className="text-[15px]" /> 168
            </span>
            <span className="flex gap-0.5 text-xs items-center">
              <BiGitPullRequest className="text-[15px]" /> 168
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
