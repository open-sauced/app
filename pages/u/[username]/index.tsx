import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiCopy, FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import { PostHog } from "posthog-js";
import { usePostHog } from "posthog-js/react";
import clsx from "clsx";
import { FaGlobe, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { AiOutlineGift } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { SignInWithOAuthCredentials, User } from "@supabase/supabase-js";
import SEO from "layouts/SEO/SEO";

import useContributorPullRequests from "lib/hooks/api/useContributorPullRequests";
import useRepoList from "lib/hooks/useRepoList";
import { getAvatarByUsername } from "lib/utils/github";
import useContributorLanguages from "lib/hooks/api/useContributorLanguages";
import getContributorPullRequestVelocity from "lib/utils/get-contributor-pr-velocity";
import { useHasMounted } from "lib/hooks/useHasMounted";
import { isValidUrlSlug } from "lib/utils/url-validators";
import useSession from "lib/hooks/useSession";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";

import rainbowCover from "img/rainbow-cover.png";
import pizzaGradient from "img/icons/pizza-gradient.svg";
import openSaucedImg from "img/openSauced-icon.png";
import Avatar from "components/atoms/Avatar/avatar";
import Tooltip from "components/atoms/Tooltip/tooltip";
import { cardPageUrl } from "lib/utils/urls";
import Button from "components/shared/Button/button";
import colors from "lib/utils/color.json";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { AllSimpleColors, LanguageObject } from "components/molecules/CardHorizontalBarChart/card-horizontal-bar-chart";
import { writeToClipboard } from "lib/utils/write-to-clipboard";
import { shortenUrl } from "lib/utils/shorten-url";
import { Toast, ToasterToast, useToast } from "lib/hooks/useToast";
import Title from "components/atoms/Typography/title";
import { LanguagePill } from "components/shared/LanguagePill/LanguagePill";
import Badge from "components/atoms/Badge/badge";
import { getTimeByTimezone, getTimezone } from "lib/utils/timezones";
import { getFormattedDate, getRelativeDays } from "lib/utils/date-utils";
import { InterestType } from "lib/utils/getInterestOptions";
import Text from "components/atoms/Typography/text";
import { DATA_FALLBACK_VALUE } from "lib/utils/fallback-values";
import Pill from "components/atoms/Pill/pill";
import CardLineChart from "components/molecules/CardLineChart/card-line-chart";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import PullRequestTable from "components/molecules/PullRequestTable/pull-request-table";
import MultiSelect, { OptionKeys } from "components/atoms/Select/multi-select";
import { addListContributor, useFetchAllLists } from "lib/hooks/useList";
import { useFetchUser } from "lib/hooks/useFetchUser";
import { copyToClipboard } from "lib/utils/copy-to-clipboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/atoms/Tabs/tabs";
import UserRepositoryRecommendations from "components/organisms/UserRepositoryRecommendations/user-repository-recommendations";
import { setQueryParams } from "lib/utils/query-params";

type TabKey = "highlights" | "contributions" | "recommendations";
const tabs: Record<TabKey, string> = {
  highlights: "Highlights",
  contributions: "Contributions",
  recommendations: "Recommendations",
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { username } = (context.params as { username: string }) ?? { username: "" };

  if (!isValidUrlSlug(username)) {
    return { notFound: true };
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`, {
    headers: {
      accept: "application/json",
    },
  });

  if (!req.ok) {
    return { notFound: true };
  }

  const userData = (await req.json()) as DbUser;

  return {
    props: { user: userData },
  };
};

export default function UserPage({ user }: { user: DbUser }) {
  const router = useRouter();
  const currentPath = router.asPath;
  const posthog = usePostHog();
  const { toast } = useToast();
  const hasMounted = useHasMounted();
  const range = (router.query.range as string) ?? "30";
  const ogImage = `${process.env.NEXT_PUBLIC_OPENGRAPH_URL}/users/${user.login}`;

  const { tab = "contributions" } = router.query as { tab: TabKey };
  function onTabChange(value: string) {
    const tabValue = value as TabKey;
    setQueryParams({ tab: tabValue } satisfies { tab: TabKey });
  }

  const username = user.login;
  const { session } = useSession(true);
  const { user: loggedInUser, signIn } = useSupabaseAuth();
  const isOwner = user?.login === loggedInUser?.user_metadata.user_name;

  const { data: contributorPRData, meta: contributorPRMeta } = useContributorPullRequests({
    contributor: username,
    topic: "*",
    repoIds: [],
    limit: 50,
    range: range,
  });
  const interestArray = user.interests?.split(",").filter(Boolean) as InterestType[];
  const repoList = useRepoList(Array.from(new Set(contributorPRData.map((prData) => prData.repo_name))).join(","));
  const prVelocity = getContributorPullRequestVelocity(contributorPRData);

  const mergedPrs = contributorPRData.filter((prData) => prData.pr_is_merged);
  const contributorLanguages = useContributorLanguages(username);
  const githubAvatar = getAvatarByUsername(username, 300);

  function UserNotConnectedTabs() {
    return (
      <>
        <div>
          <Title className="!text-light-slate-12 !text-xl" level={4}>
            Contribution Insights
          </Title>
        </div>
        <div className="p-4 mt-4 bg-white border rounded-2xl md:p-6">
          <div className="flex flex-col justify-between gap-2 lg:flex-row md:gap-12 lg:gap-16">
            <div>
              <span className="text-xs text-light-slate-11">PRs opened</span>
              {contributorPRMeta.itemCount >= 0 ? (
                <div className="flex mt-1 lg:justify-center md:pr-8">
                  <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    {contributorPRMeta.itemCount} PRs
                  </Text>
                </div>
              ) : (
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
              )}
            </div>
            <div>
              <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
              {prVelocity ? (
                <div className="flex items-center gap-2 lg:justify-center">
                  <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    {getRelativeDays(prVelocity)}
                  </Text>

                  <Pill
                    color="purple"
                    text={`${Math.floor(((mergedPrs.length || 0) / contributorPRMeta.itemCount) * 100)}%`}
                  />
                </div>
              ) : (
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
              )}
            </div>
            <div>
              <span className="text-xs text-light-slate-11">Contributed Repos</span>
              {repoList.length >= 0 ? (
                <div className="flex mt-1 lg:justify-center">
                  <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                    {`${repoList.length} Repo${repoList.length > 1 ? "s" : ""}`}
                  </Text>
                </div>
              ) : (
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
              )}
            </div>
          </div>
          <div className="h-32 mt-10">
            <CardLineChart contributor={user?.login} range={Number(range)} className="!h-32" />
          </div>
          <div>
            <CardRepoList limit={7} repoList={repoList} total={repoList.length} />
          </div>

          <div className="mt-6">
            <PullRequestTable limit={15} contributor={user?.login} topic={"*"} repositories={undefined} range={range} />
          </div>
          <div className="mt-8 text-sm text-light-slate-9">
            <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${username} | OpenSauced`}
        description={`${user?.bio || `${username} has connected their GitHub but has not added a bio.`}`}
        image={ogImage}
        twitterCard="summary_large_image"
      />
      {hasMounted && (
        <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
          <div className="w-full ">
            {/* HEADER SECTION */}
            <UserPageHeader
              user={user}
              avatar={githubAvatar}
              posthog={posthog}
              isOwner={isOwner}
              currentPath={currentPath}
              toast={toast}
            />

            <div className="container flex flex-col justify-between w-full px-2 pt-24 mx-auto overflow-hidden md:px-16 lg:flex-row lg:gap-40">
              {/* INFO SECTION */}
              <div className="flex flex-col lg:gap-4 md:gap-2 lg:w-80 md:w-full">
                <div className="flex flex-col gap-6">
                  <div className="pb-6 border-b">
                    <div className="flex gap-2 items-center mb-2">
                      <Title className="!text-2xl" level={3}>
                        {user.login}
                      </Title>
                      {user.is_maintainer && <Badge text="maintainer" />}
                    </div>
                    <div className="flex items-center text-sm gap-3">
                      {user.is_open_sauced_member && (
                        <>
                          <div className="flex gap-2 items-center">
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold text-sm"> {user.followers_count} </span>
                              <span className="font-normal text-light-slate-11 text-sm"> followers</span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <span className="font-semibold text-sm"> {user.following_count} </span>
                              <span className="font-normal text-light-slate-11 text-sm"> following</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  {user.is_open_sauced_member && (
                    <>
                      <div className="flex flex-col gap-2 border-b pb-6">
                        <Title className="!text-base" level={5}>
                          About
                        </Title>
                        <p className={clsx(" text-sm", !user.bio && "")}>
                          {user.bio || user.login + " has connected their GitHub but has not added a bio."}
                        </p>
                        <div className="flex flex-col text-sm mt-2  gap-2">
                          {user.display_local_time && (
                            <span className="flex gap-2 items-center">
                              <FiClock />
                              <span>
                                {getTimeByTimezone(user.timezone ? getTimezone(user.timezone) : 1)}{" "}
                                {user.timezone ? `(UTC${getTimezone(user.timezone)})` : "(UTC+1)"}
                              </span>
                            </span>
                          )}

                          {user.url && (
                            <span className="flex gap-2 items-center">
                              <FaGlobe />
                              <Link href={user.url} target="_blank" className="w-max hover:text-orange-500 ">
                                {user.url}
                              </Link>
                            </span>
                          )}

                          <span className="flex gap-2 items-center">
                            <Tooltip content="First PR Opened Date">
                              <AiOutlineGift className="" />
                            </Tooltip>
                            {user.first_opened_pr_at ? getFormattedDate(user.first_opened_pr_at) : "June 2022"}
                          </span>

                          <span className="flex gap-2 items-center">
                            <FiGithub />
                            <Link
                              href={`https://github.com/${user.login}`}
                              target="_blank"
                              className="w-max hover:text-orange-500 "
                            >
                              {user.login}
                            </Link>
                          </span>

                          {user.twitter_username && (
                            <span className="flex gap-2 items-center">
                              <FaXTwitter />
                              <Link
                                href={`https://twitter.com/${user.twitter_username}`}
                                target="_blank"
                                className="w-max hover:text-orange-500 "
                              >
                                {user.twitter_username}
                              </Link>
                            </span>
                          )}

                          {user.linkedin_url && (
                            <span className="flex gap-2 items-center">
                              <FiLinkedin />
                              <Link href={user.linkedin_url} target="_blank" className="w-max hover:text-orange-500 ">
                                {user.linkedin_url.replace(
                                  /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile|company)/,
                                  "in"
                                )}
                              </Link>
                            </span>
                          )}

                          {user.discord_url && (
                            <span className="flex gap-2 items-center">
                              <BsDiscord />
                              <Link href={user.discord_url} target="_blank" className="w-max hover:text-orange-500">
                                {`discord/#${user.discord_url.match(/\d{17,}$/)?.[0]}`}
                              </Link>
                            </span>
                          )}

                          {user.github_sponsors_url && (
                            <span className="flex gap-2 items-center">
                              <FiGithub />
                              <Link
                                href={user.github_sponsors_url}
                                target="_blank"
                                className="w-max hover:text-orange-500 "
                              >
                                {user.github_sponsors_url.replace(/^(http(s)?:\/\/)?([\w]+\.)?github\.com\//, "")}
                              </Link>
                            </span>
                          )}
                        </div>
                      </div>
                      {interestArray && interestArray.length > 0 && (
                        <div className="flex  flex-col gap-4 border-b pb-6">
                          <Title className="!text-base" level={5}>
                            Current Interests
                          </Title>
                          <div className="flex gap-1.5 flex-wrap">
                            {interestArray.map((interest, index) => (
                              <Link
                                href={`/explore/topic/${interest}/dashboard/filter/recent`}
                                key={index}
                                className="rounded-3xl"
                              >
                                <LanguagePill topic={interest} />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div>
                  <p className="mb-4">Languages</p>
                  <UserLanguageChart contributorLanguages={contributorLanguages} />
                </div>
              </div>

              {/* TABS SECTION */}
              <div className="flex-1 mt-10 lg:mt-0">
                {user ? (
                  <Tabs value={tab} onValueChange={onTabChange}>
                    <TabsList className="justify-start w-full overflow-x-auto border-b">
                      {(Object.keys(tabs) as TabKey[]).map((tab) => (
                        <TabsTrigger
                          key={tab}
                          className={clsx(
                            "data-[state=active]:border-sauced-orange shrink-0 data-[state=active]:border-b-2 text-lg",
                            tab === "recommendations" &&
                              "font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA4600] to-[#EB9B00]",
                            loggedInUser &&
                              loggedInUser.user_metadata.user_name !== user.login &&
                              tab === "recommendations" &&
                              "hidden",
                            !user && tab === "recommendations" && "hidden"
                          )}
                          value={tab}
                        >
                          {tabs[tab]}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    <UserInviteJumbotron
                      user={user}
                      loggedInUser={loggedInUser}
                      posthog={posthog}
                      toast={toast}
                      signIn={signIn}
                    />

                    {/* Highlights Tab details */}
                    <UserHighlightsTab user={user} />

                    {/* Contributions Tab Details */}
                    <UserContributionsTab />

                    {loggedInUser && loggedInUser.user_metadata.login === user.login && (
                      <UserRecommendationsTab user={user} interests={user.interests} />
                    )}
                  </Tabs>
                ) : (
                  <UserNotConnectedTabs />
                )}
              </div>
            </div>
          </div>
        </WorkspaceLayout>
      )}
    </>
  );
}

type UserPageHeaderProps = {
  user: DbUser;
  avatar?: string;
  isOwner: boolean;
  posthog: PostHog;
  currentPath: string;
  toast: ({ ...props }: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
};

function UserPageHeader({ user, avatar, isOwner, posthog, currentPath, toast }: UserPageHeaderProps) {
  const [host, setHost] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHost(window.location.origin as string);
    }
  }, [user]);

  const handleCopyToClipboard = async (content: string) => {
    const url = new URL(content).toString();
    posthog!.capture("clicked: profile copied", {
      profile: user.login,
    });

    try {
      const shortUrl = await shortenUrl(url);
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <div className="w-full relative bg-light-slate-6 h-[216px]">
      {user?.is_open_sauced_member && (
        <div className="absolute w-full h-full">
          <Image priority alt="user profile cover image" fill={true} className="object-cover" src={rainbowCover} />
        </div>
      )}

      <div className="container flex flex-row items-end justify-between gap-2 px-2 py-6 mx-auto md:px-16">
        <div className="translate-y-[65px] hidden md:inline-flex relative">
          <Avatar
            initialsClassName="text-[100px] -translate-y-2.5  leading-none"
            initials={user.login?.charAt(0)}
            hasBorder
            avatarURL={user?.is_open_sauced_member ? avatar : ""}
            size={184}
            isCircle
          />

          <Tooltip content="Get dev card">
            <Link
              href={cardPageUrl(user?.login!)}
              className="absolute bottom-0 z-10 grid w-12 h-12 rounded-full shadow-xs place-content-center border-conic-gradient right-4"
            >
              <div className="grid overflow-hidden rounded-full w-11 h-11 place-content-center bg-black/80">
                <Image priority alt="user profile cover image" className="w-6 h-[1.7rem] " src={pizzaGradient} />
              </div>
            </Link>
          </Tooltip>
        </div>
        <div className="translate-y-[110px] md:hidden relative">
          <Avatar
            initialsClassName="text-[70px] -translate-y-1 leading-none"
            initials={user?.login?.charAt(0)}
            hasBorder
            avatarURL={user?.is_open_sauced_member ? avatar : ""}
            size={120}
            isCircle
          />
          <Link
            href={cardPageUrl(user?.login!)}
            className="absolute bottom-0 z-10 grid rounded-full shadow-xs w-11 h-11 right-1 place-content-center border-conic-gradient"
          >
            <div className="grid w-[2.5em] h-[2.5em] overflow-hidden rounded-full place-content-center bg-black/80">
              <Image priority alt="user profile cover image" className="w-5 h-5 " src={pizzaGradient} />
            </div>
          </Link>
        </div>

        {user?.is_open_sauced_member ? (
          <div className="flex flex-col items-center gap-3 translate-y-24 md:translate-y-0 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:gap-6">
              <Button
                onClick={() => handleCopyToClipboard(`${host}/u/${user?.login}`)}
                className="my-auto gap-2 items-center shrink-0 place-self-end"
                variant="primary"
              >
                <FiCopy />
                <span className="hidden md:block">Share</span>
              </Button>

              {user && !isOwner && <AddToListDropdown username={user.login ?? ""} />}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center max-md:translate-y-14">
            {!isOwner && (
              <Button
                onClick={() => {
                  handleCopyToClipboard(`${new URL(currentPath, location.origin)}`).then(() => {
                    toast({
                      title: "Copied to clipboard",
                      description: "Share this link with your friend to invite them to OpenSauced!",
                      variant: "success",
                    });
                  });
                }}
                variant="primary"
              >
                Invite to opensauced
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function UserHighlightsTab({ user }: { user: DbUser }) {
  return <></>;
  {
    /**
  return (
    <TabsContent value={"highlights" satisfies TabKey}>
      {(hasHighlights || inputVisible) && user_name === login && (
        <div className="flex max-w-3xl px-2 pt-4 lg:gap-x-3">
          <div className="hidden lg:inline-flex pt-[0.4rem]">
            <Avatar
              alt="user profile avatar"
              isCircle
              size="sm"
              avatarURL={`https://www.github.com/${user.login}.png?size=300`}
            />
          </div>

          <HighlightInputForm refreshCallback={mutate} />
        </div>
      )}
      <div className="flex flex-col gap-8 mt-8">
        {isError && <>An error occurred</>}
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
                    user={user.login || ""}
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
  )
  **/
  }
}

function UserContributionsTab() {
  return <></>;
  {
    /**
  return (
    <TabsContent value={"contributions" satisfies TabKey}>
      <div className="mt-4">
        <div className="p-4 mt-4 bg-white border rounded-2xl md:p-6">
          <div className="flex justify-end">
            <DayRangePicker />
          </div>
          <div className="flex flex-col justify-between gap-2 lg:flex-row md:gap-12 lg:gap-16">
            <div>
              <span className="text-xs text-light-slate-11">PRs opened</span>
              {totalPrs ? (
                <div className="flex mt-1 lg:justify-center md:pr-8">
                  <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">{totalPrs} PRs</Text>
                </div>
              ) : (
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
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
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
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
                <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
              )}
            </div>
          </div>
          <div className="mt-2 h-36">
            <CardLineChart contributor={githubName} range={Number(range)} className="!h-36" />
          </div>
          <div>
            <CardRepoList limit={7} repoList={repoList} />
          </div>
          <div className="mt-6">
            <PullRequestTable
              limit={15}
              contributor={githubName}
              topic={"*"}
              repositories={undefined}
              range={range}
            />
          </div>
          <div className="mt-8 text-sm text-light-slate-9">
            <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
  **/
  }
}

function UserRecommendationsTab({ user, interests }: { user: DbUser; interests: string }) {
  return (
    <TabsContent value={"recommendations" satisfies TabKey}>
      <UserRepositoryRecommendations contributor={user} userInterests={interests} />
    </TabsContent>
  );
}

type UserInviteJumbotronProps = {
  user: DbUser;
  loggedInUser: User | null;
  posthog: PostHog;
  signIn: (data: SignInWithOAuthCredentials) => void;
  toast: ({ ...props }: Toast) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
};

function UserInviteJumbotron({ user, loggedInUser, posthog, signIn, toast }: UserInviteJumbotronProps) {
  const handleInviteClick = () => {
    const hasSocials = !!(user.twitter_username || user.display_email || user.linkedin_url);

    if (!hasSocials) {
      posthog!.capture("clicked: profile copied", {
        profile: user.login,
      });

      copyToClipboard(`${new URL(`/u/${user.login}`, location.origin)}`).then(() => {
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

  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showInviteJumbotron, setShowInviteJumbotron] = useState(!user.is_open_sauced_member);

  const EMAIL_BODY = `Hey ${user.login}. I'm using OpenSauced to keep track of my contributions and discover new projects. Try connecting your GitHub to https://oss.fyi/try`;
  return (
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
            Do you know {user.login}?
          </Title>
        </div>

        <p className="text-slate-500 text-sm mt-2">
          Invite {user.login} to join OpenSauced to be able to access insights, interact with other developers and find
          new open source opportunities!
        </p>
      </div>
      <div className="flex items-end flex-col gap-2 self-end flex-1 max-md:w-full">
        {!showSocialLinks && (
          <Button onClick={handleInviteClick} className="max-md:w-full md:w-40 flex justify-center" variant="primary">
            Invite to opensauced
          </Button>
        )}

        {showSocialLinks && (
          <div className="flex items-center gap-3">
            {user.twitter_username && (
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out @saucedopen. The platform for open source contributors to find their next contribution. https://oss.fyi/social-coding. @${user.twitter_username}`
                )}&hashtags=opensource,github`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-400 rounded-full p-3"
              >
                <FaXTwitter className="text-lg" />
              </a>
            )}
            {user.display_email && (
              <a
                href={`mailto:${user.email}?subject=${encodeURIComponent(
                  "Invitation to join OpenSauced!"
                )}&body=${encodeURIComponent(EMAIL_BODY)}`}
                className="text-white bg-red-400 rounded-full p-3"
              >
                <TbMailFilled className="text-lg" />
              </a>
            )}
            {user.linkedin_url && (
              <a
                href={`https://www.linkedin.com/in/${user.linkedin_url}`}
                className="text-white bg-blue-600 rounded-full p-3"
              >
                <FaLinkedinIn className="text-lg" />
              </a>
            )}
          </div>
        )}

        {!loggedInUser && !showSocialLinks && (
          <Button
            onClick={() =>
              signIn({
                provider: "github",
                options: { redirectTo: `${window.location.origin}/u/${user.login}` },
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
  );
}

function UserLanguageChart({ contributorLanguages }: { contributorLanguages: LanguageObject[] }) {
  const languageToColor: AllSimpleColors = colors as AllSimpleColors;
  const NOTSUPPORTED = "#64748B";
  const colorKeys = Object.keys(colors);
  const languageList = (contributorLanguages || []).map((language) => {
    const preparedLanguageKey = colorKeys.find((key) => key.toLowerCase() === language.languageName.toLowerCase());

    return {
      languageName: preparedLanguageKey ? preparedLanguageKey : language.languageName,
      percentageUsed: language.percentageUsed,
    };
  });
  const sortedLangArray = languageList.slice().sort((a, b) => b.percentageUsed - a.percentageUsed);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (sortedLangArray.length === 0) return;

    const totalSumOfFirstFivePercentage = sortedLangArray
      .slice(0, 5)
      .map((lang) => lang.percentageUsed)
      .reduce((prev: number, next: number) => prev + next);
    setPercentage(totalSumOfFirstFivePercentage);
  }, [percentage, sortedLangArray]);

  return (
    <div className="flex flex-col gap-1 min-w-[7.5rem]">
      <div className="flex items-center w-full justify-end rounded-full gap-0.5 overflow-hidden">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) => {
          return (
            index < 5 && (
              <div
                key={index}
                className="h-2 transition-all duration-500 ease-in-out"
                style={{
                  width: `${percentageUsed < 20 ? (percentageUsed / percentage) * 100 : percentageUsed}%`,
                  backgroundColor: languageToColor[languageName]
                    ? (languageToColor[languageName].color as string)
                    : NOTSUPPORTED,
                }}
              />
            )
          );
        })}
      </div>
      <div className="flex flex-wrap mt-2 text-sm gap-x-4 gap-y-2">
        {sortedLangArray.map(({ languageName, percentageUsed }, i) => {
          return (
            i < 5 && (
              <div key={i} className="flex items-center gap-2.5 ">
                <span
                  style={{
                    backgroundColor: languageToColor[languageName]
                      ? (languageToColor[languageName].color as string)
                      : NOTSUPPORTED,
                  }}
                  className="w-2.5 h-2.5 rounded-full "
                ></span>
                <p>
                  {languageName}{" "}
                  <span className="font-normal">{`${Number((percentageUsed / percentage) * 100).toFixed(1)}%`}</span>
                </p>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}

// Making this dropdown separate to optimize for performance and not fetch certain data until the dropdown is rendered
const AddToListDropdown = ({ username }: { username: string }) => {
  const [selectListOpen, setSelectListOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<OptionKeys[]>([]);
  const { data } = useFetchAllLists();
  const { data: contributor } = useFetchUser(username ?? "");
  const { toast } = useToast();

  const listOptions = data ? data.map((list) => ({ label: list.name, value: list.id })) : [];

  const handleSelectList = (value: OptionKeys) => {
    const isOptionSelected = selectedList.some((s) => s.value === value.value);
    if (isOptionSelected) {
      setSelectedList((prev) => prev.filter((s) => s.value !== value.value));
    } else {
      setSelectedList((prev) => [...prev, value]);
    }
  };

  const handleAddToList = async () => {
    if (selectedList.length > 0 && contributor) {
      const listIds = selectedList.map((list) => list.value);
      const response = Promise.all(listIds.map((listIds) => addListContributor(listIds, [{ id: contributor.id }])));

      response
        .then((res) => {
          toast({
            description: `
          You've added ${username} to ${selectedList.length} list${selectedList.length > 1 ? "s" : ""}!`,
            variant: "success",
          });
        })
        .catch((res) => {
          const failedList = listOptions.filter((list) => res.some((r: any) => r.error?.list_id === list.value));
          toast({
            description: `
          Failed to add ${username} to ${failedList[0].label} ${
            failedList.length > 1 && `and ${failedList.length - 1} other lists`
          } !
          `,
            variant: "danger",
          });
        });
    }
  };

  useEffect(() => {
    if (!selectListOpen && selectedList.length > 0) {
      handleAddToList();
      setSelectedList([]);
    }
  }, [selectListOpen]);

  return (
    <MultiSelect
      open={selectListOpen}
      setOpen={setSelectListOpen}
      emptyState={
        <div className="grid gap-2 p-4">
          <p>You have no lists</p>
          <Link className="text-sauced-orange" href="/hub/lists/new">
            Create a list
          </Link>
        </div>
      }
      className="md:px-4 max-sm:text-sm"
      placeholder="Add to list"
      options={listOptions}
      selected={selectedList}
      setSelected={setSelectedList}
      handleSelect={(option) => handleSelectList(option)}
    />
  );
};
