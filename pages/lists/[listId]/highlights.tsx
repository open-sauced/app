import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { formatDistanceToNowStrict } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import ListPageLayout from "layouts/lists";
import { fetchApiData, validateListPath } from "helpers/fetchApiData";
import Search from "components/atoms/Search/search";

import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import Avatar from "components/atoms/Avatar/avatar";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import {
  PaginatedListContributorsHighlightsResponse,
  useFetchListContributorsHighlights,
  useListHighlightsTaggedRepos,
} from "lib/hooks/useList";
import useDebounceTerm from "lib/hooks/useDebounceTerm";
import { setQueryParams } from "lib/utils/query-params";

import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";

import Icon from "components/atoms/Icon/icon";
import repoTofilterList from "lib/utils/repo-to-filter-list";
import { ContributorListPageProps } from "./activity";

interface HighlightsPageProps extends ContributorListPageProps {
  highlights: PaginatedListContributorsHighlightsResponse;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId, repo } = ctx.params as { listId: string; repo?: string };
  const limit = 10; // Can pull this from the querystring in the future
  const [{ data, error: contributorListError }, { data: list, error }, { data: highlights, error: highlightError }] =
    await Promise.all([
      fetchApiData<PagedData<DBListContributor>>({
        path: `lists/${listId}/contributors?limit=${limit}`,
        bearerToken,
        pathValidator: validateListPath,
      }),
      fetchApiData<DBList>({ path: `lists/${listId}`, bearerToken, pathValidator: validateListPath }),
      fetchApiData<PagedData<DbHighlight>>({
        path: `lists/${listId}/contributors/highlights?repo=${repo}`,
        bearerToken,
        pathValidator: validateListPath,
      }),
    ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);

  return {
    props: {
      list,
      numberOfContributors: data?.meta.itemCount || 0,
      isOwner: list && list.user_id === userId,
      highlights: {
        data: highlights?.data || [],
        meta: highlights?.meta || {},
      },
    },
  };
};

const rangeFilterOptions: { label: string; value: string }[] = [
  {
    label: "Past week",
    value: "7",
  },
  {
    label: "Past 30 days",
    value: "30",
  },
  {
    label: "Past 3 months",
    value: "90",
  },
];

const Highlights = ({ list, numberOfContributors, isOwner, highlights }: HighlightsPageProps) => {
  const router = useRouter();
  const repo = router.query.repo as string;

  const { limit = 10, range = 30 } = router.query;
  const topRef = useRef<HTMLDivElement>(null);

  const { data: emojis } = useFetchAllEmojis();
  const { data: taggedRepos } = useListHighlightsTaggedRepos(list?.id ?? "");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filterOptions = useMemo(() => {
    return repoTofilterList(taggedRepos);
  }, [taggedRepos]);

  const handleRepoFilter = (name: string) => {
    setSelectedFilter(selectedFilter === name ? "" : name);
    setQueryParams({ repo: name });
  };

  const [contributor, setContributor] = useState("");
  const debouncedSearchTerm = useDebounceTerm(contributor, 300);

  const { data, isLoading, meta } = useFetchListContributorsHighlights({
    listId: list?.id ?? "",
    initialData: highlights,
    repo,
    range: range as number,
    contributor,
    limit: limit as number,
  });

  function onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.length >= 3) {
      setContributor(searchTerm);
    }
  }

  useEffect(() => {
    onSearch(contributor);
  }, [debouncedSearchTerm]);

  return (
    <ListPageLayout showRangeFilter={false} list={list} numberOfContributors={numberOfContributors} isOwner={isOwner}>
      <div
        ref={topRef}
        className="container flex flex-col justify-center  w-full gap-12 pt-4 mt-5 md:mt-0 md:items-start md:justify-start md:flex-row"
      >
        <div className={`xl:sticky lg:top-14 xl:flex flex-none w-full  md:w-max  xl:w-1/5`}>
          <div className="w-full min-w-max bg-white border shadow-sm rounded-lg px-5 py-6 flex flex-col gap-4">
            <Search
              value={contributor}
              onChange={(value) => {
                onSearch(value);
              }}
              placeholder="Search contributors"
              className="!w-full"
              name="helo"
            />

            {taggedRepos && taggedRepos.length > 0 ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm text-light-slate-9">Tagged Repositories</span>
                {filterOptions &&
                  filterOptions.length > 0 &&
                  filterOptions.map(({ full_name, repoIcon, repoName }) => (
                    <div
                      onClick={() => handleRepoFilter(full_name)}
                      key={full_name as string}
                      className={`${
                        selectedFilter === full_name ? "border-orange-600 bg-orange-200" : ""
                      } flex hover:border-orange-600 hover:bg-orange-200 cursor-pointer gap-1 w-max  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12`}
                    >
                      <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
                      <span className="max-w-[45px] md:max-w-[100px] truncate text-xs ">{repoName}</span>
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full 2xl:max-w-[40rem] xl:max-w-[33rem] flex flex-col gap-10">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <SkeletonWrapper radius={100} width={40} height={40} /> <SkeletonWrapper width={200} height={40} />
              </div>
              <SkeletonWrapper height={300} />
            </div>
          ) : null}

          {!isLoading && data && data.length === 0 ? (
            <DashContainer>
              <p> No highlights published in the past {range} days</p>
            </DashContainer>
          ) : null}
          <ClientOnly>
            {data && data.length > 0
              ? data.map(({ id, url, title, created_at, highlight, shipped_at, login, type, tagged_repos }) => (
                  <div key={id} className="flex flex-col gap-6 px-1 w-full">
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
                    <div className="w-full p-4 border bg-light-slate-1 md:px-6 lg:px-9 lg:py-5 lg:max-w-[33rem] sm:py-3 xs:py-2 rounded-xl">
                      <ContributorHighlightCard
                        title={title}
                        desc={highlight}
                        highlightLink={url}
                        shipped_date={shipped_at}
                        user={login}
                        id={id}
                        type={type}
                        taggedRepos={tagged_repos}
                        emojis={emojis}
                      />
                    </div>
                  </div>
                ))
              : null}
          </ClientOnly>
        </div>
        {meta.pageCount > 1 && (
          <div className="flex items-center justify-between max-w-3xl px-2 mt-10">
            <div className="flex items-center w-max gap-x-4">
              <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"highlights"} />
            </div>
            <Pagination
              pages={
                meta.pageCount > 1
                  ? new Array(meta.pageCount).fill(0).map((_, index) => index + 1)
                  : new Array(1).fill(0).map((_, index) => index + 1)
              }
              totalPage={meta.pageCount}
              page={meta.page}
              pageSize={meta.itemCount}
              goToPage
              hasNextPage={meta.hasNextPage}
              hasPreviousPage={meta.hasPreviousPage}
              onPageChange={function (page: number): void {
                setQueryParams({ page: `${page}` });
                if (topRef.current) {
                  topRef.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
            />
          </div>
        )}
      </div>
    </ListPageLayout>
  );
};

export default Highlights;
