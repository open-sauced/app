import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
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
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { useIsWorkspaceUpgraded } from "lib/hooks/api/useIsWorkspaceUpgraded";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import { ContributorListPageProps } from "./activity";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

interface HighlightsPageProps extends ContributorListPageProps {
  highlights: PaginatedListContributorsHighlightsResponse;
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";

  const { listId, repo, workspaceId = null } = ctx.params as { listId: string; repo?: string; workspaceId?: string };
  const limit = 10; // Can pull this from the querystring in the future

  const query = new URLSearchParams();

  if (repo) {
    query.append("repo", repo);
  }
  query.append("limit", "10");

  const [
    { data, error: contributorListError },
    { data: list, error },
    { data: highlights, error: highlightError },
    { data: workspaceMembers },
  ] = await Promise.all([
    fetchApiData<PagedData<DbContributorInsightUser>>({
      path: `workspaces/${workspaceId}/userLists/${listId}/contributors?limit=${limit}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<DBList>({
      path: `workspaces/${workspaceId}/userLists/${listId}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<PagedData<DbHighlight>>({
      path: `workspaces/${workspaceId}/userLists/${listId}/contributors/highlights?${query}`,
      bearerToken,
      pathValidator: validateListPath,
    }),
    fetchApiData<{ data?: WorkspaceMember[] }>({
      path: `workspaces/${workspaceId}/members`,
      bearerToken,
      pathValidator: () => true,
    }),
  ]);

  if (error?.status === 404) {
    return {
      notFound: true,
    };
  }

  const userId = Number(session?.user.user_metadata.sub);
  const owners = Array.from(workspaceMembers?.data || [], (member: { role: string; member: Record<string, any> }) => {
    if (member.role === "owner") {
      return member.member.login;
    }
  }).filter(Boolean);

  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  return {
    props: {
      list,
      workspaceId,
      numberOfContributors: data?.meta.itemCount || 0,
      isOwner,
      highlights: {
        data: highlights?.data || [],
        meta: highlights?.meta || {},
      },
      owners,
    },
  };
};

const Highlights = ({ list, workspaceId, numberOfContributors, isOwner, highlights, owners }: HighlightsPageProps) => {
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
  const { data: isWorkspaceUpgraded } = useIsWorkspaceUpgraded({ workspaceId });
  const showBanner = isOwner && !isWorkspaceUpgraded;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

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
    <WorkspaceLayout
      workspaceId={workspaceId}
      banner={
        showBanner ? (
          <WorkspaceBanner workspaceId={workspaceId} openModal={() => setIsInsightUpgradeModalOpen(true)} />
        ) : null
      }
    >
      <ListPageLayout
        showRangeFilter={false}
        list={list}
        workspaceId={workspaceId}
        numberOfContributors={numberOfContributors}
        isOwner={isOwner}
        owners={owners}
        overLimit={showBanner}
      >
        <div
          ref={topRef}
          className="flex flex-col justify-center w-full gap-x-10 pt-4 md:mt-0 md:items-start md:justify-start md:flex-row"
        >
          <div className="xl:sticky lg:top-14 xl:flex flex-none w-full md:w-max">
            <div className="w-full min-w-max border shadow-sm rounded-lg px-5 py-6 flex flex-col gap-4">
              <Search
                value={contributor}
                onChange={(value) => {
                  onSearch(value);
                }}
                isDisabled={data.length === 0 && !contributor}
                placeholder="Search contributors"
                className="!w-full"
                name="helo"
              />

              {taggedRepos && taggedRepos.length > 0 ? (
                <ClientOnly>
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
                </ClientOnly>
              ) : null}
            </div>
          </div>
          <div className="w-full 2xl:max-w-[40rem] xl:max-w-[33rem] flex flex-col gap-10">
            {isLoading ? (
              <ClientOnly>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <SkeletonWrapper radius={100} width={40} height={40} /> <SkeletonWrapper width={200} height={40} />
                  </div>
                  <SkeletonWrapper height={300} />
                </div>
              </ClientOnly>
            ) : null}

            {!isLoading && data && data.length === 0 ? (
              <DashContainer className="lg:max-w-[33rem]">
                <p> No highlights published in the past {range} days</p>
              </DashContainer>
            ) : null}

            {data && data.length > 0
              ? data.map(({ id, url, title, created_at, highlight, shipped_at, login, type, tagged_repos }) => (
                  <div key={id} className="flex flex-col gap-6 px-1 w-full">
                    <div className="flex items-center gap-3">
                      <ClientOnly>
                        <Link href={`/u/${login}`} className="flex items-center gap-3">
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
                      </ClientOnly>
                    </div>
                    <div className="w-full p-4 border bg-light-slate-1 md:px-6 lg:px-9 lg:py-5 lg:max-w-[33rem] sm:py-3 xs:py-2 rounded-xl">
                      <ClientOnly>
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
                      </ClientOnly>
                    </div>
                  </div>
                ))
              : null}

            {meta.pageCount > 1 && (
              <div className="flex items-center justify-between max-w-3xl mt-4 xl:pr-24">
                <div className="flex items-center w-max gap-x-4">
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
        </div>
      </ListPageLayout>
      <InsightUpgradeModal
        workspaceId={workspaceId}
        variant="contributors"
        isOpen={isInsightUpgradeModalOpen}
        onClose={() => setIsInsightUpgradeModalOpen(false)}
        overLimit={numberOfContributors}
      />
    </WorkspaceLayout>
  );
};

export default Highlights;
