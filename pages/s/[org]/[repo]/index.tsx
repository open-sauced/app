import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { fetchApiData } from "helpers/fetchApiData";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import SEO from "layouts/SEO/SEO";
import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import StarsChart from "components/Graphs/StarsChart";
import MetricCard from "components/Graphs/MetricCard";
import { DayRangePicker } from "components/shared/DayRangePicker";

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

  return { props: { repoData, image: owner?.avatar_url || "" } };
}

export default function RepoPage({ repoData, image }: { repoData: DbRepo; image: string }) {
  const syncId = repoData.id;
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
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
    <ProfileLayout>
      <SEO title={`${repoData.full_name} - OpenSauced Insights`} />
      <header className="flex items-center gap-4 self-start p-8">
        <Avatar size={96} avatarURL={image} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{repoData.full_name}</h1>
          <p className="text-xl">{repoData.description}</p>
        </div>
      </header>

      <section className="flex flex-col gap-8">
        <DayRangePicker />
        <section className="flex gap-8 w-full justify-center">
          <MetricCard variant="stars" stats={starsData} />
          <MetricCard variant="forks" stats={forkStats} />
        </section>
        <StarsChart stats={starsData} total={repoData.stars} range={range} syncId={syncId} />
      </section>
    </ProfileLayout>
  );
}
