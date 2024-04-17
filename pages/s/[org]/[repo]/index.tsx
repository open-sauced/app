import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ComponentProps } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { fetchApiData } from "helpers/fetchApiData";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import MetricCard from "components/Graphs/MetricCard";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const response = await fetch(repoData.url || `https://api.github.com/repos/${org}/${repo}`);
  const { owner } = await response.json();

  const range = (context.query.range ? Number(context.query.range) : 30) as Range;
  const { href: ogImageUrl } = new URL(
    getRepositoryOgImage(repoData, range),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  return { props: { repoData, image: owner?.avatar_url || "", ogImageUrl } };
}

type Range = ComponentProps<typeof MetricCard>["range"];

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

  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <ProfileLayout>
        <section className="px-2 pt-2 md:pt-4 md:px-4 flex flex-col gap-2 md:gap-4 lg:gap-8 w-full xl:max-w-6xl">
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
          <DayRangePicker />
          <section className="flex flex-col gap-2 md:gap-4 lg:gap-8 lg:flex-row w-full justify-between">
            <ClientOnly>
              <MetricCard variant="stars" stats={starsData} range={range} isLoading={isStarsDataLoading} />
              <MetricCard variant="forks" stats={forkStats} range={range} isLoading={isForksDataLoading} />
            </ClientOnly>
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
        </section>
      </ProfileLayout>
    </>
  );
}
