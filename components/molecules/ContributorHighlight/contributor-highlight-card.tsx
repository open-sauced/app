import Title from "components/atoms/Typography/title";
import { generateApiPrUrl } from "lib/utils/github";
import React from "react";
import PullRequestHighlightCard from "../PullRequestHighlightCard/pull-request-highlight-card";
import { useFetchGithubPRInfo } from "lib/hooks/useFetchGithubPRInfo";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  prLink: string;
}
const ContributorHighlightCard = ({ title, desc, prLink }: ContributorHighlightCardProps) => {
  const { data, isLoading, isError } = useFetchGithubPRInfo(generateApiPrUrl(prLink));

  return (
    <article className="flex flex-col max-w-[40rem] flex-1 gap-6">
      <div>
        {title && (
          <Title className="!text-xl !text-light-slate-12" level={4}>
            {title}
          </Title>
        )}
        <div></div>
      </div>

      {/* Highlight body section */}
      <div>
        <p className="text-light-slate-11 font-normal">{desc}</p>
      </div>
      {/* Highlight Link section */}

      <div>
        <a href={prLink} className="underline text-sauced-orange cursor-pointer">
          {prLink}
        </a>
      </div>

      {/* Generated OG card section */}
      {isLoading && <>Loading...</>}
      {isError && <>An error occured...</>}
      {data && (
        <div>
          <PullRequestHighlightCard
            userAvatar={data.user.avatar_url}
            userName={data.user.login}
            repoName={data.head.repo.name}
            ticketNumber={data.number}
            createdAt={data.created_at}
            commentCount={data.comments}
            prTitle={data.title}
            orgName={data.head.user.login}
          />
        </div>
      )}
    </article>
  );
};

export default ContributorHighlightCard;
