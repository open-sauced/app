import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { usePostHog } from "posthog-js/react";

import { MdClose } from "react-icons/md";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import Avatar from "components/atoms/Avatar/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import HighlightInputForm from "components/molecules/HighlightInput/highlight-input-form";
import Pill from "components/atoms/Pill/pill";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import ContributorHighlightCard from "components/molecules/ContributorHighlight/contributor-highlight-card";
import { useFetchUserHighlights } from "lib/hooks/useFetchUserHighlights";
import Button from "components/shared/Button/button";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useFetchAllEmojis from "lib/hooks/useFetchAllEmojis";
import { setQueryParams } from "lib/utils/query-params";
import { copyToClipboard } from "lib/utils/copy-to-clipboard";

import openSaucedImg from "img/openSauced-icon.png";

import Title from "components/atoms/Typography/title";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import Pagination from "components/molecules/Pagination/pagination";
import DashContainer from "components/atoms/DashedContainer/DashContainer";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { useToast } from "lib/hooks/useToast";
import { DATA_FALLBACK_VALUE } from "lib/utils/fallback-values";
import { DayRangePicker } from "components/shared/DayRangePicker";
import IssueCommentsTable from "components/Profiles/IssueCommentsTable/issue-comments-table";
import { contributionsOptions, useContributionsFilter } from "components/Profiles/contributors-sub-tab-list";
import { SubTabsList } from "components/TabList/tab-list";
import { OscrButton } from "components/Contributors/Oscr";
import UserRepositoryRecommendations from "../UserRepositoryRecommendations/user-repository-recommendations";

interface ContributorProfileTabProps {
  contributor?: DbUser;
  prTotal: number;
  totalPrs: number;
  prVelocity?: number;
  prMerged: number;
  recentContributionCount: number;
  prsMergedPercentage: number;
  githubName: string;
  repoList: RepoList[];
  range?: string;
}

type TabKey = "highlights" | "contributions" | "recommendations";

// Query Params type for this page
interface QueryParams {
  tab: TabKey;
}

const tabs: Record<TabKey, string> = {
  contributions: "Contributions",
  highlights: "Highlights",
  recommendations: "Recommendations",
};

const ContributorProfileTab = ({
  contributor,
  totalPrs,
  prVelocity,
  prsMergedPercentage,
  githubName,
  recentContributionCount,
  repoList,
  range,
}: ContributorProfileTabProps): JSX.Element => {
  const {
    login,
    interests: userInterests,
    receive_collaboration,
    email,
    twitter_username,
    linkedin_url,
    display_email,
    is_open_sauced_member,
  } = contributor || {};
  const { user, signIn } = useSupabaseAuth();
  const { user_name } = user?.user_metadata || {};
  const [showInviteJumbotron, setShowInviteJumbotron] = useState(!!is_open_sauced_member ? false : true);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const { toast } = useToast();
  const posthog = usePostHog();
  const [selectedRepo, setSelectedRepo] = useState("");

  const { data: highlights, isError, isLoading, mutate, meta, setPage } = useFetchUserHighlights(login || "");
  const { data: emojis } = useFetchAllEmojis();

  const router = useRouter();
  const { tab = "contributions" } = router.query as { tab: TabKey };

  const hasHighlights = highlights ? highlights.length > 0 : false;
  const [inputVisible, setInputVisible] = useState(false);

  const { showPRs, showIssueComments, selected, setSelected } = useContributionsFilter();

  function onTabChange(value: string) {
    const tabValue = value as TabKey;
    setQueryParams({ tab: tabValue } satisfies QueryParams);
  }

  const getTabTriggerClassName = (tab: TabKey): string => {
    return clsx(
      "data-[state=active]:border-sauced-orange shrink-0 data-[state=active]:border-b-2 text-lg",
      tab === "recommendations" &&
        "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA4600] to-[#EB9B00]",
      user && user_name !== login && tab === "recommendations" && "hidden",
      !user && tab === "recommendations" && "hidden"
    );
  };

  const emailBody = `Hey ${login}. I'm using OpenSauced to keep track of my contributions and discover new projects. Try connecting your GitHub to https://oss.fyi/try`;

  const handleInviteClick = () => {
    const hasSocials = !!(twitter_username || display_email || linkedin_url);

    if (!hasSocials) {
      posthog!.capture("clicked: profile copied", {
        profile: login,
      });

      copyToClipboard(`${new URL(`/u/${login}`, location.origin)}`).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Share this link with your friend to invite them to OpenSauced!",
          variant: "success",
        });
      });
    } else {
      setShowSocialLinks(true);
    }
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
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList className="justify-start w-full overflow-x-auto border-b">
        {(Object.keys(tabs) as TabKey[]).map((tab) => (
          <TabsTrigger key={tab} className={getTabTriggerClassName(tab)} value={tab}>
            {tabs[tab]}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Highlights Tab details */}

      {showInviteJumbotron && (
        <div className="bg-white relative p-6 my-10 rounded-xl gap-4 flex flex-col md:flex-row items-center justify-between shadow-xl md:pr-14">
          <MdClose
            onClick={() => setShowInviteJumbotron(!showInviteJumbotron)}
            role="button"
            className="absolute right-5 top-5 text-xl text-slate-600"
          />
          <div className="flex-1 md:flex-[2.5]">
            <div className="flex items-center gap-2">
              <Image className="rounded" alt="OpenSauced Logo" width={30} height={30} src={openSaucedImg} />
              <Title className="font-semibold text-lg" level={4}>
                Do you know {login}?
              </Title>
            </div>

            <p className="text-slate-500 text-sm mt-2">
              Invite {login} to join OpenSauced to be able to access insights, interact with other developers and find
              new open source opportunities!
            </p>
          </div>
          <div className="flex items-end flex-col gap-2 self-end flex-1 max-md:w-full">
            {!showSocialLinks && (
              <Button
                onClick={handleInviteClick}
                className="max-md:w-full md:w-40 flex justify-center"
                variant="primary"
              >
                Invite to OpenSauced
              </Button>
            )}

            {showSocialLinks && (
              <div className="flex items-center gap-3">
                {twitter_username && (
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `Check out @saucedopen. The platform for open source contributors to find their next contribution. https://oss.fyi/social-coding. @${twitter_username}`
                    )}&hashtags=opensource,github`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-blue-400 rounded-full p-3"
                  >
                    <FaXTwitter className="text-lg" />
                  </a>
                )}
                {!!display_email && (
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(
                      "Invitation to join OpenSauced!"
                    )}&body=${encodeURIComponent(emailBody)}`}
                    className="text-white bg-red-400 rounded-full p-3"
                  >
                    <TbMailFilled className="text-lg" />
                  </a>
                )}
                {!!linkedin_url && (
                  <a
                    href={`https://www.linkedin.com/in/${linkedin_url}`}
                    className="text-white bg-blue-600 rounded-full p-3"
                  >
                    <FaLinkedinIn className="text-lg" />
                  </a>
                )}
              </div>
            )}

            {!user && !showSocialLinks && (
              <Button
                onClick={() =>
                  signIn({
                    provider: "github",
                    options: { redirectTo: `${window.location.origin}/u/${login}` },
                  })
                }
                className="max-md:w-full md:w-40 flex justify-center"
                variant="text"
              >
                This is me!
              </Button>
            )}
          </div>
        </div>
      )}

      <TabsContent value={"highlights" satisfies TabKey}>
        {(hasHighlights || inputVisible) && user_name === login && (
          <div className="flex max-w-3xl px-2 pt-4 lg:gap-x-3">
            <div className="hidden lg:inline-flex pt-[0.4rem]">
              <Avatar
                alt="user profile avatar"
                isCircle
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
            <div className="flex justify-end">
              <DayRangePicker />
            </div>
            <div className="grid grid-cols-2 2xl:grid-cols-4 justify-between gap-2 lg:flex-row md:gap-12 lg:gap-16">
              <div>
                <span className="text-xs text-light-slate-11">OSCR Rating</span>
                <div className="flex mt-1 text-lg md:text-xl lg:text-2xl !text-black leading-none">
                  <OscrButton rating={contributor?.oscr} hideRating={!Boolean(user)} />
                </div>
              </div>
              <div>
                <span className="text-xs text-light-slate-11">PRs opened</span>
                {totalPrs ? (
                  <div className="flex mt-1 !text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    {totalPrs} PRs
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
                )}
              </div>

              <div>
                <span className="text-xs text-light-slate-11">PRs opened</span>
                {prVelocity ? (
                  <div className="flex mt-1 gap-2 !text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    <span>{prVelocity} PRs</span>
                    <Pill color="purple" text={`${prsMergedPercentage}%`} className="-mt-1 md:mt-0" />
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
                )}
              </div>
              <div>
                <span className="text-xs text-light-slate-11">Contributed Repos</span>
                {recentContributionCount ? (
                  <div className="flex mt-1 !text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    {`${recentContributionCount} Repo${recentContributionCount > 1 ? "s" : ""}`}
                  </div>
                ) : (
                  <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
                )}
              </div>
            </div>
            <div className="mt-2 h-36">
              <CardLineChart contributor={githubName} range={Number(range)} className="!h-36" repo={selectedRepo} />
            </div>
            <div>
              <CardRepoList
                limit={7}
                repoList={repoList}
                onSelect={(repo) => setSelectedRepo(repo)}
                showCursor={true}
              />
            </div>
            <div className="mt-6 flex flex-col">
              <div className="pb-2">
                <SubTabsList
                  label="Contributions"
                  textSize="small"
                  tabList={contributionsOptions}
                  selectedTab={selected.toLowerCase()}
                  onSelect={(e) => setSelected(e.name)}
                />
              </div>

              {showPRs && (
                <div className="pt-2 min-h-[275px] md:min-h-[550px]">
                  <PullRequestTable
                    limit={15}
                    contributor={githubName}
                    topic={"*"}
                    repositories={undefined}
                    range={range}
                    repoFilter={selectedRepo}
                  />
                </div>
              )}
              {showIssueComments && (
                <div className="pt-2 min-h-[275px] md:min-h-[550px]">
                  <IssueCommentsTable
                    contributor={githubName}
                    limit={15}
                    range={Number(range ?? 30)}
                    repoFilter={selectedRepo}
                  />
                </div>
              )}
            </div>
            <div className="mt-8 text-sm text-light-slate-9">
              <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
            </div>
          </div>
        </div>
      </TabsContent>

      {user && user.user_metadata.user_name === login && (
        <>
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
