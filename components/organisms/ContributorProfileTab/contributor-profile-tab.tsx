import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import { MdClose } from "react-icons/md";
import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import Text from "components/atoms/Typography/text";
import { getRelativeDays } from "lib/utils/date-utils";
import Pill from "components/atoms/Pill/pill";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import { useFetchUserHighlights } from "lib/hooks/useFetchUserHighlights";
import Button from "components/atoms/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import { setQueryParams } from "lib/utils/query-params";

import openSaucedImg from "img/openSauced-icon.png";

import Title from "components/atoms/Typography/title";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import ConnectionRequestsWrapper from "../ConnectionRequestWrapper/connection-requests-wrapper";
import UserRepositoryRecommendations from "../UserRepositoryRecommendations/user-repository-recommendations";

interface ContributorProfileTabProps {
  contributor?: DbUser;
  prTotal: number;
  openPrs: number;
  prVelocity?: number;
  prMerged: number;
  recentContributionCount: number;
  prsMergedPercentage: number;
  chart: Object;
  githubName: string;
  repoList: RepoList[];
}

type TabKey = "highlights" | "contributions" | "connections" | "recommendations";

// Query Params type for this page
interface QueryParams {
  tab: TabKey;
}

const tabs: Record<TabKey, string> = {
  highlights: "Highlights",
  contributions: "Contributions",
  connections: "Connections",
  recommendations: "Recommendations",
};

const ContributorProfileTab = ({
  contributor,
  openPrs,
  prVelocity,
  prsMergedPercentage,
  chart,
  githubName,
  recentContributionCount,
  repoList,
}: ContributorProfileTabProps): JSX.Element => {
  const { login, interests: userInterests, receive_collaboration } = contributor || {};
  const { user } = useSupabaseAuth();
  const { user_name } = user?.user_metadata || {};

  const { data: highlights, isError, isLoading, mutate, meta, setPage } = useFetchUserHighlights(login || "");
  const { data: emojis } = useFetchAllEmojis();

  const router = useRouter();
  const { tab } = router.query;

  const hasHighlights = highlights ? highlights.length > 0 : false;
  const [inputVisible, setInputVisible] = useState(false);

  const currentTab = (
    (Object.keys(tabs).includes(tab as string) && tab) || hasHighlights ? "highlights" : "contributions"
  ) as TabKey;
  function onTabChange(value: string) {
    const tabValue = value as TabKey;
    setQueryParams({ tab: tabValue } satisfies QueryParams);
  }

  // Setting the query param "tab" if none exists
  useEffect(() => {
    if (
      !tab ||
      !Object.keys(tabs).includes(tab as string) ||
      (tab === "recommendations" && user_name !== login) ||
      (tab === "connections" && !receive_collaboration) ||
      (tab === "connections" && user_name !== login)
    ) {
      setQueryParams({ tab: currentTab } satisfies QueryParams);
    }

    // If the user is not the owner of the profile, block them from accessing the recommendations tab
  }, [tab, currentTab]);

  const getTabTriggerClassName = (tab: TabKey): string => {
    return clsx(
      "data-[state=active]:border-sauced-orange shrink-0 data-[state=active]:border-b-2 text-lg",
      tab === "recommendations" &&
        "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA4600] to-[#EB9B00]",
      user && user_name !== login && tab === "recommendations" && "hidden",
      user && user_name !== login && tab === "connections" && "hidden",
      !user && tab === "recommendations" && "hidden",
      !user && tab === "connections" && "hidden",
      !receive_collaboration && tab === "connections" && "hidden"
    );
  };

  const getEmptyHighlightPreset = (): JSX.Element => {
    switch (user_name === login) {
      case true:
        return (
          <DashContainer>
            <div className="text-center">
              <p>
                You don&apos;t have any highlights yet! <br /> Highlights are a great way to show off your
                contributions. Merge any pull requests recently?
              </p>
              {!inputVisible && (
                <Button onClick={() => setInputVisible(true)} className="mt-5" variant="primary">
                  Add a highlight
                </Button>
              )}
            </div>
          </DashContainer>
        );
      case false:
        <DashContainer>
          <div className="text-center">
            <p>
              <b>{login}</b> doesn&apos;t have any highlights yet!
            </p>
          </div>
        </DashContainer>;
      default:
        return (
          <DashContainer>
            <div className="text-center">
              <p>
                <b>{login}</b> doesn&apos;t have any highlights yet!
              </p>
            </div>
          </DashContainer>
        );
    }
  };

  return (
    <Tabs value={String(router.query.tab)} onValueChange={onTabChange}>
      <TabsList className="justify-start w-full overflow-x-auto border-b">
        {(Object.keys(tabs) as TabKey[]).map((tab) => (
          <TabsTrigger key={tab} className={getTabTriggerClassName(tab)} value={tab}>
            {tabs[tab]}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Highlights Tab details */}

      <div className="bg-white relative p-6 my-10 rounded-xl flex items-center justify-between shadow-xl pr-14">
        <MdClose role="button" className="absolute right-5 top-5 text-xl text-slate-600" />
        <div className="flex-[2.5] ">
          <div className="flex items-center gap-2">
            <Image className="rounded" alt="Open Sauced Logo" width={30} height={30} src={openSaucedImg} />
            <Title className="font-semibold text-lg" level={4}>
              Do you know {login}?
            </Title>
          </div>

          <p className="text-slate-500 text-sm mt-2">
            Invite {login} to join OpenSauced to be able to access insights, interact with other developers and find new
            open source opportunities!
          </p>
        </div>
        <div className="flex-1 flex items-end flex-col gap-2">
          <Button className="w-40" variant="primary">
            Invite to opensauced
          </Button>
          <Button className="w-40 flex justify-center" variant="text">
            This is me!
          </Button>
        </div>
      </div>

      <TabsContent value={"highlights" satisfies TabKey}>
        {(hasHighlights || inputVisible) && user_name === login && (
          <div className="lg:pl-20 lg:gap-x-4 pt-4 flex max-w-[48rem]">
            <div className="hidden lg:inline-flex">
              <Avatar
                alt="user profile avatar"
                size="sm"
                avatarURL={`https://www.github.com/${githubName}.png?size=300`}
              />
            </div>

            <HighlightInputForm refreshCallback={mutate} />
          </div>
        )}
        <div className="flex flex-col gap-8 mt-8">
          {isError && <>An error occured</>}
          {isLoading && (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-6" key={index}>
                  <SkeletonWrapper width={100} height={20} />
                  <div className="md:max-w-[40rem]">
                    <SkeletonWrapper height={20} width={500} classNames="mb-2" />
                    <SkeletonWrapper height={300} />
                  </div>
                </div>
              ))}
            </>
          )}
          <>
            {hasHighlights ? (
              <div>
                {highlights.map(({ id, title, highlight, url, shipped_at, created_at, type, tagged_repos }) => (
                  <div className="flex flex-col gap-2 mb-6 lg:flex-row lg:gap-7" key={id}>
                    <div>
                      <Link href={`/feed/${id}`}>
                        <p className="text-sm text-light-slate-10 w-28 max-w-28">
                          {formatDistanceToNowStrict(new Date(created_at), { addSuffix: true })}
                        </p>
                      </Link>
                    </div>
                    <ContributorHighlightCard
                      emojis={emojis}
                      id={id}
                      user={login || ""}
                      title={title}
                      desc={highlight}
                      highlightLink={url}
                      shipped_date={shipped_at}
                      type={type}
                      refreshCallBack={mutate}
                      taggedRepos={tagged_repos}
                    />
                  </div>
                ))}
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
            ) : (
              getEmptyHighlightPreset()
            )}
          </>
        </div>
      </TabsContent>

      {/* Contributions Tab Details */}

      <TabsContent value={"contributions" satisfies TabKey}>
        <div className="mt-4">
          <div className="p-4 mt-4 bg-white border rounded-2xl md:p-6">
            <div className="flex flex-col justify-between gap-2 lg:flex-row md:gap-12 lg:gap-16">
              <div>
                <span className="text-xs text-light-slate-11">PRs opened</span>
                {openPrs ? (
                  <div className="flex mt-1 lg:justify-center md:pr-8">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">{openPrs} PRs</Text>
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1"> - </div>
                )}
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Avg PR velocity</span>
                {prVelocity ? (
                  <div className="flex items-center gap-2 lg:justify-center">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                      {getRelativeDays(prVelocity)}
                    </Text>

                    <Pill color="purple" text={`${prsMergedPercentage}%`} />
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1"> - </div>
                )}
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Contributed Repos</span>
                {recentContributionCount ? (
                  <div className="flex mt-1 lg:justify-center">
                    <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                      {`${recentContributionCount} Repo${recentContributionCount > 1 ? "s" : ""}`}
                    </Text>
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1"> - </div>
                )}
              </div>
            </div>
            <div className="mt-2 h-36">
              <CardLineChart lineChartOption={chart} className="!h-36" />
            </div>
            <div>
              <CardRepoList limit={7} repoList={repoList} />
            </div>

            <div className="mt-6">
              <PullRequestTable limit={15} contributor={githubName} topic={"*"} repositories={undefined} />
            </div>
            <div className="mt-8 text-sm text-light-slate-9">
              <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
            </div>
          </div>
        </div>
      </TabsContent>

      {user && user.user_metadata.user_name === login && (
        <>
          {/* Connection requests tab details */}
          <TabsContent value={"connections" satisfies TabKey}>
            <ConnectionRequestsWrapper />
          </TabsContent>

          {/* Recommendation tab details */}
          <TabsContent value={"recommendations" satisfies TabKey}>
            <UserRepositoryRecommendations contributor={contributor} userInterests={userInterests} />
          </TabsContent>
        </>
      )}
    </Tabs>
  );
};

export default ContributorProfileTab;
