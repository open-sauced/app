import { GetServerSidePropsContext } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { fetchApiData } from "helpers/fetchApiData";
import { getAllFeatureFlags } from "lib/utils/server/feature-flags";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";

import SEO from "layouts/SEO/SEO";
import ProfileLayout from "layouts/profile";
import Avatar from "components/atoms/Avatar/avatar";
import MetricCard from "components/Graphs/MetricCard";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = Number(session?.user.user_metadata.sub);
  if (!userId) {
    return { notFound: true };
  }

  const featureFlags = await getAllFeatureFlags(userId);
  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}`,
  });

  if (!featureFlags["repo-page"] || !repoData || error) {
    return { notFound: true };
  }

  const response = await fetch(repoData.url);
  const { owner } = await response.json();

  return { props: { repoData, image: owner.avatar_url } };
}

export default function RepoPage({ repoData, image }: { repoData: DbRepo; image: string }) {
  const { data: starStats, error: starError } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "stars",
    range: 30,
  });

  const { data: forkStats, error: forkError } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "forks",
    range: 30,
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

      <section className="flex gap-8 w-full justify-center">
        <MetricCard variant="stars" stats={starStats} />
        <MetricCard variant="forks" stats={forkStats} />
      </section>
    </ProfileLayout>
  );
}
