import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FiClock, FiCopy, FiGithub, FiLinkedin } from "react-icons/fi";
import { useEffect, useState } from "react";
import { PostHog } from "posthog-js";
import { usePostHog } from "posthog-js/react";
import clsx from "clsx";
import { FaGlobe, FaXTwitter } from "react-icons/fa6";
import { AiOutlineGift } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
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
import { getFormattedDate } from "lib/utils/date-utils";
import { InterestType } from "lib/utils/getInterestOptions";

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

  const username = user.login;
  const { session } = useSession(true);
  const { user: loggedInUser } = useSupabaseAuth();
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
            <UserPageHeader
              user={user}
              avatar={githubAvatar}
              posthog={posthog}
              isOwner={isOwner}
              currentPath={currentPath}
              toast={toast}
            />

            <div className="container flex flex-col justify-between w-full px-2 pt-24 mx-auto overflow-hidden md:px-16 lg:flex-row lg:gap-40">
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
              <div className="flex-1 mt-10 lg:mt-0">
                {/**
                {!!user ? (
                  <ContributorProfileTab
                    repoList={repoList}
                    recentContributionCount={recentContributionCount}
                    prVelocity={prVelocity}
                    totalPrs={totalPrs}
                    user?.login={githubName}
                    prMerged={prMerged}
                    contributor={user}
                    prTotal={prTotal}
                    prsMergedPercentage={prsMergedPercentage}
                    range={range}
                  />
                ) : (
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
                          {totalPrs >= 0 ? (
                            <div className="flex mt-1 lg:justify-center md:pr-8">
                              <Text className="!text-lg md:!text-xl lg:!text-2xl !text-black !leading-none">
                                {totalPrs} PRs
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

                              <Pill color="purple" text={`${prsMergedPercentage}%`} />
                            </div>
                          ) : (
                            <div className="flex items-end justify-center mt-1">{DATA_FALLBACK_VALUE}</div>
                          )}
                        </div>
                        <div>
                          <span className="text-xs text-light-slate-11">Contributed Repos</span>
                          {recentContributionCount >= 0 ? (
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
                      <div className="h-32 mt-10">
                        <CardLineChart
                          repoIds={repositories}
                          contributor={user?.login}
                          range={Number(range)}
                          className="!h-32"
                        />
                      </div>
                      <div>
                        <CardRepoList limit={7} repoList={repoList} total={repoList.length} />
                      </div>

                      <div className="mt-6">
                        <PullRequestTable
                          limit={15}
                          contributor={user?.login}
                          topic={"*"}
                          repositories={undefined}
                          range={range}
                        />
                      </div>
                      <div className="mt-8 text-sm text-light-slate-9">
                        <p>The data for these contributions is from publicly available open source projects on GitHub.</p>
                      </div>
                    </div>
                  </>
                )}
                **/}
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

function UserPageInfo() {
  return <></>;
}

function UserHighlightsTab() {
  return <></>;
}

function UserContributionsTab() {
  return <></>;
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

function AddToListDropdown({ username }: { username: string }) {
  return <></>;
}
