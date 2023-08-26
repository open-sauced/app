import React, { useEffect } from "react";
import Link from "next/link";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import { useFetchFollowingHighlights } from "lib/hooks/useFetchFollowingHighlights";
import { setQueryParams } from "lib/utils/query-params";

import Avatar from "components/atoms/Avatar/avatar";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import DashContainer from "components/atoms/DashedContainer/DashContainer";

export interface HighlightWrapperProps {
  emojis: DbEmojis[];
  selectedFilter: string;
}
const FollowingHighlightWrapper = ({ emojis, selectedFilter }: HighlightWrapperProps) => {
  const { data, isLoading, isError, mutate, meta, setPage } = useFetchFollowingHighlights(selectedFilter);

  useEffect(() => {
    if (selectedFilter) {
      setQueryParams({ repo: selectedFilter });
      setPage(1);
    }
  }, [selectedFilter, setPage]);

  return (
    <div>
      <div className="flex flex-col gap-8 mt-10">
        {isLoading && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <SkeletonWrapper radius={100} width={40} height={40} /> <SkeletonWrapper width={200} height={40} />
            </div>
            <SkeletonWrapper height={300} />
          </div>
        )}

        {data && data.length > 0 ? (
          data.map(({ id, url, title, created_at, highlight, shipped_at, login, type, tagged_repos }) => (
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
                  <span className="text-xs font-normal text-light-slate-11">
                    {formatDistanceToNowStrict(new Date(created_at), { addSuffix: true })}
                  </span>
                </Link>
              </div>
              <div className="p-4 py-6 border bg-light-slate-1 md:px-6 lg:px-12 rounded-xl">
                <ContributorHighlightCard
                  emojis={emojis}
                  refreshCallBack={mutate}
                  title={title}
                  desc={highlight}
                  highlightLink={url}
                  shipped_date={shipped_at}
                  user={login}
                  id={id}
                  type={type}
                  taggedRepos={tagged_repos}
                />
              </div>
            </div>
          ))
        ) : (
          <DashContainer>
            <p>You have not followed any user yet!</p>
          </DashContainer>
        )}
      </div>

      {meta.pageCount > 1 && (
        <div className="mt-10 max-w-[48rem] flex px-2 items-center justify-between">
          <div>
            <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"highlights"} />
          </div>
          <Pagination
            pages={[]}
            totalPage={meta.pageCount}
            page={meta.page}
            pageSize={meta.itemCount}
            goToPage
            hasNextPage={meta.hasNextPage}
            hasPreviousPage={meta.hasPreviousPage}
            onPageChange={function (page: number): void {
              setPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FollowingHighlightWrapper;
