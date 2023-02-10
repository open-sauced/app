import Title from "components/atoms/Typography/title";
import { generateApiPrUrl } from "lib/utils/github";
import React from "react";
import PullRequestHighlightCard from "../PullRequestHighlightCard/pull-request-highlight-card";

interface ContributorHighlightCardProps {
  title?: string;
  desc?: string;
  prLink: string;
}
const ContributorHighlightCard = ({ title, desc, prLink }: ContributorHighlightCardProps) => {
  console.log(generateApiPrUrl(prLink));
  return (
    <article className="flex flex-col gap-6">
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
      <div>
        <PullRequestHighlightCard />
      </div>
    </article>
  );
};

export default ContributorHighlightCard;
