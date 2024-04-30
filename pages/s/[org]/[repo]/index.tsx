import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { HiOutlineExternalLink } from "react-icons/hi";
import { usePostHog } from "posthog-js/react";
import { FiCopy } from "react-icons/fi";
import { fetchApiData } from "helpers/fetchApiData";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";
import { useToast } from "lib/hooks/useToast";
import { shortenUrl } from "lib/utils/shorten-url";
import Button from "components/shared/Button/button";
import { getAvatarByUsername } from "lib/utils/github";
import { useRepoStats } from "lib/hooks/api/useRepoStats";

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

  return { props: { repoData, ogImageUrl } };
}

type Range = 30 | 7 | 90 | 180 | 360;

interface RepoPageProps {
  repoData: DbRepoInfo;
  ogImageUrl: string;
}

export default function RepoPage({ repoData, ogImageUrl }: RepoPageProps) {
  const avatarUrl = getAvatarByUsername(repoData.full_name.split("/")[0], 96);
  const { toast } = useToast();
  const posthog = usePostHog();

  const syncId = repoData.id;
  const router = useRouter();
  const range = (router.query.range ? Number(router.query.range) : 30) as Range;
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

  const { data: repoStats, isError, isLoading } = useRepoStats({ repoFullName: repoData.full_name, range });

  const starsRangedTotal = starsData?.reduce((prev, curr) => prev + curr.star_count!, 0);
  const forksRangedTotal = forkStats?.reduce((prev, curr) => prev + curr.forks_count!, 0);

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: repo page share button", {
      repo_name: repoData.full_name,
    });

    try {
      const shortUrl = await shortenUrl(url);
      await navigator.clipboard.writeText(shortUrl);
      toast({ description: "Copied to clipboard.", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <ProfileLayout>
        <section className="px-2 pt-2 md:pt-4 md:px-4 flex flex-col gap-2 md:gap-4 lg:gap-8 w-full xl:max-w-6xl">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center gap-4">
            <header className="flex items-center gap-4">
              <Avatar size={96} avatarURL={avatarUrl} />
              <div className="flex flex-col gap-2">
                <a
                  href={`https://github.com/${repoData.full_name}`}
                  target="_blank"
                  className="group hover:underline underline-offset-2 text-xl md:text-3xl font-bold flex gap-2 items-center"
                >
                  <h1>{repoData.full_name}</h1>
                  <HiOutlineExternalLink className="group-hover:text-sauced-orange text-lg lg:text-xl" />
                </a>
                <p className="md:text-xl">{repoData.description}</p>
              </div>
            </header>
            <div className="self-end flex gap-2 items-center">
              <DayRangePicker />
              <Button
                variant="outline"
                onClick={copyUrlToClipboard}
                className="my-auto gap-2 items-center shrink-0 place-self-end"
              >
                <FiCopy />
                Share
              </Button>
            </div>
          </div>
          <ClientOnly>
            <section className="w-full h-fit grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-2">
              <RepositoryStatCard
                type="stars"
                isLoading={isStarsDataLoading}
                hasError={starsError !== undefined}
                stats={{
                  total: repoData.stars,
                  over_range: starsRangedTotal!,
                  range,
                  average_over_range: Math.round(starsRangedTotal! / range),
                }}
              />
              <RepositoryStatCard
                type="forks"
                isLoading={isForksDataLoading}
                hasError={forkError !== undefined}
                stats={{
                  total: repoData.forks,
                  over_range: forksRangedTotal!,
                  range,
                  average_over_range: Math.round(forksRangedTotal! / range),
                }}
              />
              <RepositoryStatCard
                type="pulls"
                isLoading={isLoading}
                hasError={isError}
                stats={
                  repoStats
                    ? {
                        opened: repoStats.open_prs_count ?? 0,
                        merged: repoStats.merged_prs_count ?? 0,
                        velocity: repoStats.pr_velocity_count ?? 0,
                        range,
                      }
                    : undefined
                }
              />
              <RepositoryStatCard
                type="issues"
                isLoading={isLoading}
                hasError={isError}
                stats={
                  repoStats
                    ? {
                        opened: repoStats.opened_issues_count ?? 0,
                        closed: repoStats.closed_issues_count ?? 0,
                        velocity: repoStats.issues_velocity_count ?? 0,
                        range,
                      }
                    : undefined
                }
              />
            </section>
            <StarsChart
              stats={starsData}
              total={repoData.stars}
              range={range}
              syncId={syncId}
              isLoading={isStarsDataLoading}
            />
            <ForksChart
              stats={forkStats}
              total={repoData.forks}
              range={range}
              syncId={syncId}
              isLoading={isForksDataLoading}
            />
          </ClientOnly>
        </section>
      </ProfileLayout>
    </>
  );
}
