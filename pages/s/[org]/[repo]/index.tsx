import { FiCopy } from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { GetServerSidePropsContext } from "next";

import Link from "next/link";
import useSession from "lib/hooks/useSession";
import { useToast } from "lib/hooks/useToast";
import { shortenUrl } from "lib/utils/shorten-url";
import { fetchApiData } from "helpers/fetchApiData";
import { getAvatarByUsername } from "lib/utils/github";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { writeToClipboard } from "lib/utils/write-to-clipboard";
import { useRepoStats } from "lib/hooks/api/useRepoStats";
import { useRepositoryRoss } from "lib/hooks/api/useRepositoryRoss";
import { useRepositoryYolo } from "lib/hooks/api/useRepositoryYolo";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";
import { useRepositoryLottoFactor } from "lib/hooks/api/useRepositoryLottoFactor";

import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/shared/Button/button";
import Pill from "components/atoms/Pill/pill";
import TabList from "components/TabList/tab-list";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import LotteryFactorChart from "components/Repositories/LotteryFactorChart";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";

import PRChart from "components/Graphs/PRChart";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import IssuesChart from "components/Graphs/IssuesChart";
import ContributorConfidenceChart from "components/Repositories/ContributorConfidenceChart";
import RossChart from "components/Repositories/RossChart";
import YoloChart from "components/Repositories/YoloChart";
import LanguagePill, { getLanguageTopic } from "components/shared/LanguagePill/LanguagePill";

const AddToWorkspaceModal = dynamic(() => import("components/Repositories/AddToWorkspaceModal"), {
  ssr: false,
});
const AddToWorkspaceDrawer = dynamic(() => import("components/Repositories/AddToWorkspaceDrawer"), {
  ssr: false,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };
  const range = (context.query.range ? Number(context.query.range) : 30) as Range;

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}/info`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const { href: ogImageUrl } = new URL(
    getRepositoryOgImage({
      description: repoData.description,
      fullRepoName: repoData.full_name,
      range,
    }),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  // Cache for two hours
  context.res.setHeader("Netlify-CDN-Cache-Control", "public, max-age=0, stale-while-revalidate=7200");
  context.res.setHeader("Netlify-Vary", "query=range");
  context.res.setHeader("Cache-Tag", `repo-pages,repo-page-${repoData.id}`);

  return { props: { repoData, ogImageUrl } };
}

type Range = 30 | 7 | 90 | 180 | 360;

interface RepoPageProps {
  repoData: DbRepoInfo;
  ogImageUrl: string;
}

export default function RepoPage({ repoData, ogImageUrl }: RepoPageProps) {
  const syncId = repoData.id;
  const router = useRouter();
  const { toast } = useToast();
  const posthog = usePostHog();
  const { session } = useSession(true);
  const isMobile = useMediaQuery("(max-width: 576px)");
  const avatarUrl = getAvatarByUsername(repoData.full_name.split("/")[0], 96);
  const [lotteryState, setLotteryState] = useState<"lottery" | "yolo">("lottery");
  const [yoloHideBots, setYoloHideBots] = useState(
    router.query.hideBots ? (router.query.hideBots === "true" ? true : false) : false
  );
  const [isAddToWorkspaceModalOpen, setIsAddToWorkspaceModalOpen] = useState(false);
  const range = (router.query.range ? Number(router.query.range) : 30) as Range;
  const tabList = [
    { name: "Overview", path: "" },
    { name: "Contributors", path: "contributors" },
  ];

  useEffect(() => {
    router.push({ query: { ...router.query, hideBots: yoloHideBots } });
  }, [yoloHideBots]);

  const {
    data: starsData,
    isLoading: isStarsDataLoading,
    error: starsError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "stars",
    range,
  });

  const {
    data: forkStats,
    isLoading: isForksDataLoading,
    error: forkError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "forks",
    range,
  });

  const {
    data: contributorStats,
    isLoading: isContributorDataLoading,
    error: contributorError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "contributors",
    range,
  });

  const {
    data: issueStats,
    isLoading: isIssueDataLoading,
    error: issueError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "issues",
    range,
  });

  const {
    data: prStats,
    isLoading: isPrDataLoading,
    error: prError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "prs",
    range,
  });

  const {
    data: rossStats,
    isLoading: isRossDataLoading,
    error: rossError,
  } = useRepositoryRoss({
    repository: repoData.full_name,
    range,
  });

  const contributorRangedTotal = contributorStats?.reduce((prev, curr) => prev + curr.contributor_count!, 0);
  const { data: repoStats, isError, isLoading } = useRepoStats({ repoFullName: repoData.full_name, range });

  const {
    data: lotteryFactor,
    error: lotteryFactorError,
    isLoading: isLotteryFactorLoading,
  } = useRepositoryLottoFactor({ repository: repoData.full_name.toLowerCase(), range });

  const {
    data: yoloStats,
    error: yoloStatsError,
    isLoading: isYoloStatsLoading,
  } = useRepositoryYolo({
    repository: repoData.full_name.toLowerCase(),
    range,
    includeBots: !yoloHideBots,
  });

  const uniqueYoloCoders = useMemo(() => {
    if (!yoloStats || !yoloStats.data) {
      return new Set<string>();
    }
    const unique = new Set<string>();
    yoloStats.data.forEach(({ actor_login }) => {
      unique.add(actor_login);
    });

    return unique;
  }, [yoloStats]);

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: repo page share button", {
      repo_name: repoData.full_name,
    });

    try {
      const shortUrl = await shortenUrl(url);
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard.", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <section className="px-2 pt-2 md:py-4 md:px-4 flex flex-col gap-2 md:gap-4 lg:gap-8 w-full xl:max-w-8xl">
            <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
              <header className="flex items-center gap-4">
                <Avatar size={96} avatarURL={avatarUrl} className="min-w-[96px]" />
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://github.com/${repoData.full_name}`}
                    target="_blank"
                    className="group hover:underline underline-offset-2 text-xl md:text-3xl font-bold flex gap-2 items-center"
                  >
                    <h1>{repoData.full_name}</h1>
                    <HiOutlineExternalLink className="group-hover:text-sauced-orange text-lg lg:text-xl" />
                  </a>
                  <p>{repoData.description}</p>
                </div>
              </header>
              <div className="self-end flex flex-col gap-2 items-end">
                {isMobile ? (
                  <AddToWorkspaceDrawer repository={repoData.full_name} />
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => setIsAddToWorkspaceModalOpen(true)}
                    className="shrink-0 items-center gap-3 w-fit"
                  >
                    <MdWorkspaces />
                    Add to Workspace
                  </Button>
                )}
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outline"
                    onClick={copyUrlToClipboard}
                    className="my-auto gap-2 items-center shrink-0 place-self-end"
                  >
                    <FiCopy />
                    Share
                  </Button>
                  <DayRangePicker />
                </div>
              </div>
            </div>
            <div className="flex w-fit max-w-xs lg:w-full lg:max-w-full gap-2 overflow-x-scroll lg:overflow-auto">
              <Link href={`/explore/topic/${getLanguageTopic(repoData.language)}/dashboard`}>
                <LanguagePill language={repoData.language.toLowerCase()} />
              </Link>
              <Pill text={repoData.license} icon={<FaBalanceScale />} size="xsmall" className="whitespace-nowrap" />
              <Pill
                text={`Last Updated: ${new Date(repoData.updated_at).toLocaleDateString()}`}
                icon={<FaRegClock />}
                size="xsmall"
                className="!px-2 whitespace-nowrap"
              />
            </div>
          </section>

          <div className="border-b mb-4">
            <TabList tabList={tabList} selectedTab={"overview"} pageId={`/s/${repoData.full_name}`} />
          </div>

          <ClientOnly>
            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:max-h-[50rem]">
                <div className="order-last lg:order-none lg:col-span-8 flex flex-col gap-4">
                  <RossChart
                    stats={rossStats}
                    range={range}
                    isLoading={isRossDataLoading}
                    error={rossError}
                    className="h-fit"
                  />

                  <div className="flex gap-4 h-full flex-col lg:flex-row">
                    <IssuesChart
                      stats={issueStats}
                      range={range}
                      velocity={repoStats?.issues_velocity_count ?? 0}
                      syncId={syncId}
                      isLoading={isIssueDataLoading}
                      className="h-full"
                    />

                    <PRChart
                      stats={prStats}
                      range={range}
                      velocity={repoStats?.pr_velocity_count ?? 0}
                      syncId={syncId}
                      isLoading={isPrDataLoading}
                      className="h-full"
                    />
                  </div>
                </div>

                <div className="order-1 lg:order-none lg:col-span-4 flex flex-col gap-4">
                  <ContributorConfidenceChart
                    contributorConfidence={repoStats?.contributor_confidence}
                    isError={isError}
                    isLoading={isLoading}
                  />

                  {lotteryState === "lottery" && (
                    <LotteryFactorChart
                      lotteryFactor={lotteryFactor}
                      error={lotteryFactorError}
                      range={range}
                      isLoading={isLotteryFactorLoading}
                      uniqueYoloCoders={uniqueYoloCoders}
                      yoloBannerOnClick={uniqueYoloCoders.size > 0 ? () => setLotteryState("yolo") : undefined}
                      showHoverCards
                    />
                  )}
                  {lotteryState === "yolo" && (
                    <YoloChart
                      yoloStats={yoloStats}
                      uniqueYoloCoders={uniqueYoloCoders}
                      yoloHideBots={yoloHideBots}
                      setYoloHideBots={setYoloHideBots}
                      repository={repoData.full_name}
                      isLoading={isYoloStatsLoading}
                      range={range}
                      backButtonOnClick={() => setLotteryState("lottery")}
                      showHoverCards
                    />
                  )}
                </div>
              </section>

              <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                <StarsChart
                  stats={starsData}
                  total={repoData.stars}
                  range={range}
                  syncId={syncId}
                  isLoading={isStarsDataLoading}
                  className="lg:col-span-6 h-fit"
                />
                <ForksChart
                  stats={forkStats}
                  total={repoData.forks}
                  range={range}
                  syncId={syncId}
                  isLoading={isForksDataLoading}
                  className="lg:col-span-6 h-fit"
                />
              </section>
            </div>
          </ClientOnly>
        </div>
      </WorkspaceLayout>

      <AddToWorkspaceModal
        repository={repoData.full_name}
        isOpen={isAddToWorkspaceModalOpen}
        onCloseModal={() => setIsAddToWorkspaceModalOpen(false)}
      />
    </>
  );
}
