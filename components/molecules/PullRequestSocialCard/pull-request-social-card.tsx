import React from "react";
import CardHorizontalBarChart, { LanguageObject } from "../CardHorizontalBarChart/card-horizontal-bar-chart";
import Text from "components/atoms/Typography/text";
import { getAvatarLink } from "lib/utils/github";
import Avatar from "components/atoms/Avatar/avatar";
import { IconContext } from "react-icons";
import { VscGitPullRequest } from "react-icons/vsc";
import { GoComment } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

interface PullRequestSocialCardProps {
  orgName: string;
  repoName: string;
  languageList: LanguageObject[];
  prTicketId: string;
  prTitle: string;
  commentsCount?: number;
  avatar?: string;
}
const PullRequestSocialCard = ({
  orgName,
  repoName,
  prTitle,
  avatar,
  languageList,
  prTicketId,
  commentsCount
}: PullRequestSocialCardProps) => {
  return (
    <div className="w-[26.375rem] cursor-pointer border rounded-xl px-5 py-4">
      <div className="flex gap-2 items-center ">
        <Avatar alt="" avatarURL={avatar} initials="" size="sm" className="" />
        <Text className="!text-sm !text-light-slate-11">
          {orgName}/<span className="text-light-slate-11">{repoName}</span>
        </Text>
      </div>
      <div className="flex gap-2 items-start mt-2">
        <IconContext.Provider value={{ color: "green", style: { width: 18, height: 18, marginTop: 4 } }}>
          <VscGitPullRequest title="Open Pull Request" />
        </IconContext.Provider>
        <Text className="!text-lg ">
          <span className="text-light-slate-10 ">{prTicketId}</span> {prTitle}
        </Text>
      </div>

      {/* Language list section */}
      <div className="mt-6">
        <CardHorizontalBarChart withDescription={false} languageList={languageList} />
      </div>

      <div className="flex items-center gap-5 text-light-slate-10 mt-3">
        <div className="flex justify-between gap-2">
          <span className="text-green-600">+24</span>
          <span className="text-red-600">-2</span>
        </div>
        <div className="flex gap-0.5">
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <div className="w-3 h-3 bg-green-600 rounded"></div>
          <div className="w-3 h-3 bg-light-slate-8 rounded"></div>
        </div>
        {commentsCount && (
          <div className="flex text-light-slate-10 items-center gap-2">
            {`${commentsCount} comment${commentsCount > 1 ? "s" : ""}`} <FaRegCommentAlt size={16} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PullRequestSocialCard;
