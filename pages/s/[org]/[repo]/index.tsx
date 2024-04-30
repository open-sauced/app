import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { FiCopy } from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import dynamic from "next/dynamic";
import { useState } from "react";
import { fetchApiData } from "helpers/fetchApiData";
import { useToast } from "lib/hooks/useToast";
import { shortenUrl } from "lib/utils/shorten-url";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";
import Button from "components/shared/Button/button";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

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
    path: `repos/${org}/${repo}?range=${range}`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const response = await fetch(repoData.url || `https://api.github.com/repos/${org}/${repo}`);
  const { owner } = await response.json();

  const { href: ogImageUrl } = new URL(
    getRepositoryOgImage(repoData, range),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  return { props: { repoData, image: owner?.avatar_url || "", ogImageUrl } };
}

type Range = 30 | 7 | 90 | 180 | 360;

interface RepoPageProps {
  repoData: DbRepo;
  image: string;
  ogImageUrl: string;
}

interface WorkspaceOgImageProps {
  repository: DbRepo;
  ogImageUrl: string;
}

export default function RepoPage({ repoData, image, ogImageUrl }: RepoPageProps) {
  const { toast } = useToast();
  const posthog = usePostHog();
  const isMobile = useMediaQuery("(max-width: 576px)");

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

  const starsRangedTotal = starsData?.reduce((prev, curr) => prev + curr.star_count!, 0);
  const forksRangedTotal = forkStats?.reduce((prev, curr) => prev + curr.forks_count!, 0);

  const [isAddToWorkspaceModalOpen, setIsAddToWorkspaceModalOpen] = useState(false);

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture(`clicked: ${repoData.full_name} repo page share`);

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
              <Avatar size={96} avatarURL={image} />
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
            <div className="self-end flex flex-col gap-2 items-end">
              {isMobile ? (
                <AddToWorkspaceDrawer />
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
                isLoading={false}
                hasError={false}
                stats={{
                  opened: repoData.open_prs_count!,
                  merged: repoData.merged_prs_count!,
                  velocity: repoData.pr_velocity_count!,
                  range,
                }}
              />
              <RepositoryStatCard
                type="issues"
                isLoading={false}
                hasError={false}
                stats={{
                  opened: repoData.opened_issues_count!,
                  closed: repoData.closed_issues_count!,
                  velocity: repoData.issues_velocity_count!,
                  range,
                }}
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

      <AddToWorkspaceModal
        isOpen={isAddToWorkspaceModalOpen}
        onCloseModal={() => setIsAddToWorkspaceModalOpen(false)}
      />
    </>
  );
}
