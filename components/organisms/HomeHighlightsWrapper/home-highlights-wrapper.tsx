import Link from "next/link";
import React from "react";

import { getFormattedDate } from "lib/utils/date-utils";

import Avatar from "components/atoms/Avatar/avatar";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";

interface HomeHighlightWrapperProps {
  mutate: () => void;
  highlights: DbHighlight[];
  emojis: DbEmojis[];
  loading: boolean;
  isError: boolean;
}

const HomeHighlightsWrapper = ({ emojis, highlights, loading, mutate, isError }: HomeHighlightWrapperProps) => {
  return (
    <div>
      <div className="flex flex-col gap-8 mt-10">
        {loading && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <SkeletonWrapper radius={100} width={40} height={40} /> <SkeletonWrapper width={200} height={40} />
            </div>
            <SkeletonWrapper height={300} />
          </div>
        )}
        {isError && <>An error occurred...</>}
        {highlights &&
          highlights.length > 0 &&
          highlights.map(({ id, url, title, created_at, highlight, shipped_at, login }) => (
            <div key={id} className="flex flex-col gap-6 px-1">
              <div className="flex items-center gap-3">
                <Link href={`/user/${login}`} className="flex items-center gap-3">
                  <Avatar
                    alt="user profile avatar"
                    isCircle
                    size="sm"
                    avatarURL={`https://www.github.com/${login}.png?size=300`}
                  />
                  <strong>{login}</strong>
                </Link>
                <Link href={`/feed/${id}`}>
                  <span className="text-xs font-normal text-light-slate-11">{getFormattedDate(created_at)}</span>
                </Link>
              </div>
              <div className="p-4 py-6 border bg-light-slate-1 md:px-6 lg:px-12 rounded-xl">
                <ContributorHighlightCard
                  emojis={emojis}
                  refreshCallBack={mutate}
                  title={title}
                  desc={highlight}
                  prLink={url}
                  shipped_date={shipped_at}
                  user={login}
                  id={id}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeHighlightsWrapper;
