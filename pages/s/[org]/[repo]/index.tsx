import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ComponentProps } from "react";
import { fetchApiData } from "helpers/fetchApiData";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import SEO from "layouts/SEO/SEO";
import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import MetricCard from "components/Graphs/MetricCard";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Card from "components/atoms/Card/card";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const response = await fetch(repoData.url);
  const { owner } = await response.json();

  return { props: { repoData, image: owner?.avatar_url || "" } };
}

type Range = ComponentProps<typeof MetricCard>["range"];

export default function RepoPage({ repoData, image }: { repoData: DbRepo; image: string }) {
  const syncId = repoData.id;
  const router = useRouter();
  const range = (router.query.range ? Number(router.query.range) : 30) as Range;
  const {
    data: starsData,
    isLoading: starsDataLoading,
    error: starsError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "stars",
    range,
  });

  const {
    data: forkStats,
    isLoading: forksDataLoading,
    error: forkError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "forks",
    range,
  });

  return (
    <ProfileLayout>
      <SEO title={`${repoData.full_name} - OpenSauced Insights`} />
      <section className="px-2 pt-2 md:pt-4 md:px-4 flex flex-col gap-2 md:gap-4 lg:gap-8 w-full xl:max-w-6xl">
        <header className="flex items-center gap-4">
          <Avatar size={96} avatarURL={image} />
          <div className="flex flex-col gap-2">
            <h1 className="text-xl md:text-3xl font-bold">{repoData.full_name}</h1>
            <p className="md:text-xl">{repoData.description}</p>
          </div>
        </header>
        <DayRangePicker />
        <ClientOnly>
          <section className="flex flex-col gap-2 md:gap-4 lg:gap-8 lg:flex-row w-full justify-between">
            {starsDataLoading ? (
              <Card className="w-full xl:max-w-lg h-fit p-5 pl-6 flex gap-8">
                <SkeletonWrapper width={216} height={123.5} count={2} />
              </Card>
            ) : (
              <MetricCard variant="stars" stats={starsData} range={range} />
            )}
            {forksDataLoading ? (
              <Card className="w-full xl:max-w-lg h-fit p-5 pl-6 flex gap-8">
                <SkeletonWrapper width={216} height={123.5} count={2} />
              </Card>
            ) : (
              <MetricCard variant="forks" stats={forkStats} range={range} />
            )}
          </section>
          {starsDataLoading ? (
            <Card className="flex flex-col gap-8 w-full h-full items-center pt-8 px-8">
              <SkeletonWrapper width={1000} height={370} />
            </Card>
          ) : (
            <StarsChart stats={starsData} total={repoData.stars} range={range} syncId={syncId} />
          )}
          {forksDataLoading ? (
            <Card className="flex flex-col gap-8 w-full h-full items-center pt-8 px-8">
              <SkeletonWrapper width={1000} height={370} />
            </Card>
          ) : (
            <ForksChart stats={forkStats} total={repoData.forks} range={range} syncId={syncId} />
          )}
        </ClientOnly>
      </section>
    </ProfileLayout>
  );
}
