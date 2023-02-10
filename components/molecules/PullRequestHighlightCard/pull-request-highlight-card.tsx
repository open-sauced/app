import Avatar from "components/atoms/Avatar/avatar";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { TbMessages } from "react-icons/tb";
import CardHorizontalBarChart from "../CardHorizontalBarChart/card-horizontal-bar-chart";

interface PullRequestHighlightCardProps {
  orgName: string;
  repoName: string;
  ticketNumber: number;
  prTitle: string;
  commentCount: number;
  userAvatar: string;
  createdAt: string;
  userName: string;
}
const PullRequestHighlightCard = () => {
  return (
    <div className="flex flex-col gap-16 bg-white pt-8 pb-4">
      <div className="px-8  flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-normal">open-sauced/insights</span>
          <h3 className="text-3xl font-semibold">
            <span className="text-light-slate-9 font-normal">#24</span> fix: Remote semicolons
          </h3>
          <div className="flex gap-2 text-light-slate-9 text-sm">
            <TbMessages className="text-lg" />1 comment
          </div>
        </div>
        <div>
          <Avatar isCircle size="lg" avatarURL="https://avatars.githubusercontent.com/u/57568598?v=4" />
        </div>
      </div>

      <div>
        <div className="px-8 flex justify-between items-center">
          <div className="flex text-sm items-center gap-2">
            <Avatar isCircle size="sm" avatarURL="https://avatars.githubusercontent.com/u/57568598?v=4" />
            <p className="text-light-slate-9 font-normal">
              <span className="text-light-slate-12 font-semibold">natemoo-re</span> opened on Dec 22, 2023
            </p>
          </div>
          <AiOutlineGithub />
        </div>
        <div className="flex flex-col mt-3 gap-4">
          <div>
            <CardHorizontalBarChart
              languageList={[{ languageName: "JavaScript", percentageUsed: 100 }]}
              withDescription={false}
            />
          </div>
          <div className="px-8">
            <p>fix: Remote semicolons · Issue #827 · open-sauced/insights</p>
            <span>GITHUB.COM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestHighlightCard;
