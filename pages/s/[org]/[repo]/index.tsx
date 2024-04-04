import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { ComponentProps } from "react";
import { fetchApiData } from "helpers/fetchApiData";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import SEO from "layouts/SEO/SEO";
import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import MetricCard from "components/Graphs/MetricCard";
import { DayRangePicker } from "components/shared/DayRangePicker";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const response = await fetch(repoData.url);
  const { owner } = await response.json();

  const range = (context.query.range ? Number(context.query.range) : 30) as Range;
  const { NEXT_PUBLIC_BASE_URL = "http://localhost:3000" } = process.env;
  const { href: ogImageUrl } = new URL(getRepositoryOgImage(repoData, range), NEXT_PUBLIC_BASE_URL);

  return { props: { repoData, image: owner?.avatar_url || "", ogImageUrl } };
}

type Range = ComponentProps<typeof MetricCard>["range"];

interface RepoPageProps {
  repoData: DbRepo;
  image: string;
  ogImageUrl: string;
}

export default function RepoPage({ repoData, image, ogImageUrl }: RepoPageProps) {
  const syncId = repoData.id;
  const router = useRouter();
  const range = (router.query.range ? Number(router.query.range) : 30) as Range;
  const { data: starsData, error: starsError } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "stars",
    range,
  });

  const { data: forkStats, error: forkError } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "forks",
    range,
  });

  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <ProfileLayout>
        <SEO title={`${repoData.full_name} - OpenSauced Insights`} />
        <section className="px-2 pt-2 md:pt-4 md:px-4 flex flex-col gap-8 w-full xl:max-w-6xl">
          <header className="flex items-center gap-4">
            <Avatar size={96} avatarURL={image} />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-3xl font-bold">{repoData.full_name}</h1>
              <p className="md:text-xl">{repoData.description}</p>
            </div>
          </header>
          <DayRangePicker />
          <section className="flex flex-col gap-2 lg:flex-row lg:gap-8 w-full justify-between">
            <ClientOnly>
              <MetricCard variant="stars" stats={starsData} range={range} />
              <MetricCard variant="forks" stats={forkStats} range={range} />
            </ClientOnly>
          </section>
          <StarsChart stats={starsData} total={repoData.stars} range={range} syncId={syncId} />
        </section>
      </ProfileLayout>
    </>
  );
}
