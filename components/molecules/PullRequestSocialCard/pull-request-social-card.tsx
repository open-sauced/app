import React from "react";
import CardHorizontalBarChart, { LanguageObject } from "../CardHorizontalBarChart/card-horizontal-bar-chart";
import Text from "components/atoms/Typography/text";
import { getAvatarLink } from "lib/utils/github";
import Avatar from "components/atoms/Avatar/avatar";
import { IconContext } from "react-icons";
import { VscGitPullRequest } from "react-icons/vsc";

interface PullRequestSocialCardProps {
  orgName: string;
  repoName: string;
  languageList: LanguageObject[];
  prTicketId: string;
  prTitle: string;
  commentsCount?: number;
  avatar?: string;
}
const PullRequestSocialCard = ({ orgName, repoName, prTitle, avatar, languageList }: PullRequestSocialCardProps) => {
  return (
    <div className="w-[26.375rem] border rounded-xl px-5 py-4">
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
        <Text className="!text-lg ">{prTitle}</Text>
      </div>

      {/* Language list section */}
      <div className="mt-6">
        <CardHorizontalBarChart withDescription={false} languageList={languageList} />
      </div>
    </div>
  );
};

export default PullRequestSocialCard;
