import Avatar from "components/atoms/Avatar/avatar";
import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { TbMessages } from "react-icons/tb";
import CardHorizontalBarChart from "../CardHorizontalBarChart/card-horizontal-bar-chart";
import { getFormattedDate } from "lib/utils/date-utils";

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
const PullRequestHighlightCard = ({
  prTitle,
  commentCount,
  userAvatar,
  createdAt,
  userName,
  ticketNumber,
  repoName,
  orgName
}: PullRequestHighlightCardProps) => {
  return (
    <div className="flex max-w-[45rem] flex-1 flex-col gap-8 lg:gap-16 bg-white pt-8 pb-4">
      <div className="lg:px-8 px-3 flex justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-normal">{`${orgName}/${repoName}`}</span>
          <h3 className="text-base lg:text-3xl font-semibold flex items-center gap-1">
            <span className="text-light-slate-9 font-normal">{`#${ticketNumber}`}</span> <p>{prTitle}</p>
          </h3>
          <div className="flex gap-2 text-light-slate-9 text-sm">
            <TbMessages className="text-lg" />
            {commentCount} comment
          </div>
        </div>
        <div className="md:hidden">
          <Avatar isCircle size="base" avatarURL={userAvatar} />
        </div>
        <div className="hidden md:inline-flex">
          <Avatar isCircle size="lg" avatarURL={userAvatar} />
        </div>
      </div>

      <div>
        <div className="lg:px-8 px-3 flex justify-between items-center">
          <div className="flex text-sm items-center gap-2">
            <Avatar isCircle size="sm" avatarURL={userAvatar} />
            <p className="text-light-slate-9 font-normal">
              <span className="text-light-slate-12 font-semibold">{userName}</span> opened on{" "}
              {getFormattedDate(createdAt)}
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
          <div className="lg:px-8 px-3">
            <p className="font-semibold">
              {prTitle}· Issue {`#${ticketNumber}`} · {`${orgName}/${repoName}`}
            </p>
            <span>GITHUB.COM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestHighlightCard;
