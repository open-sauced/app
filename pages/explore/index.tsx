import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Card from "components/atoms/Card/card";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";
import Button from "components/shared/Button/button";
import useFetchTrendingRepositories from "lib/hooks/useFetchTrendingRepositories";
import { useFetchUser } from "lib/hooks/useFetchUser";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useUserRepoRecommendations from "lib/hooks/useUserRepoRecommendations";

export default function ExploreHomePage() {
  const { session } = useSession(true);
  const { data: user } = useFetchUser(session ? session.user_name ?? "" : "");
  const { signIn } = useSupabaseAuth();

  const {
    data: trendingRepositories,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useFetchTrendingRepositories();

  const {
    data: recommendationsData,
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
  } = useUserRepoRecommendations();

  const recommendations = recommendationsData
    ? Object.keys(recommendationsData)
        .map((name) => recommendationsData[name])
        .flat()
    : [];

  return (
    <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
      <div className="px-4 py-8 lg:px-16 lg:py-12 flex flex-col gap-12 w-full lg:max-w-8xl">
        <section
          className={`
            relative flex flex-col items-center w-full gap-8 lg:px-8 lg:py-16
            bg-[url('~/img/explore-page-header.png')] bg-center bg-cover rounded-2xl
          `}
        >
          <h1 className="text-4xl font-medium text-white">
            Explore
            <span className="bg-gradient-to-r from-gradient-orange-one to-gradient-orange-two bg-clip-text text-transparent font-bold">
              {" "}
              Open Source
            </span>
          </h1>
          <Search name="Explore repositories" className="h-12 w-full max-w-3xl" />
        </section>

        <section className="flex flex-col gap-8 ">
          <Title>Trending repositories</Title>
          <section className="flex flex-nowrap gap-4 overflow-x-scroll">
            {trendingRepositories &&
              trendingRepositories.map((repo) => (
                <RecommendedRepoCard
                  key={`repo_card_${repo.repo_name}_${repo.star_count}`}
                  fullName={repo.repo_name}
                  className="min-w-[24rem]"
                />
              ))}
          </section>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Title>Recommended for You</Title>
            <p>Here are some repositories we think would be great for you. Click on one to start contributing!</p>
          </div>
          <section className="flex flex-nowrap gap-4 overflow-x-scroll">
            {session ? (
              recommendations &&
              recommendations.map((repo: DbRepo) => (
                <RecommendedRepoCard
                  key={`repo_card_${repo.full_name}`}
                  fullName={repo.full_name ?? ""}
                  className="min-w-[24rem]"
                />
              ))
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  signIn({ provider: "github" });
                }}
              >
                Connect with GitHub
              </Button>
            )}
          </section>
        </section>

        <section className="flex flex-col gap-8">
          <Title>Discover Workspaces</Title>
          <Card>
            <h1>Fair Source Companies</h1>
          </Card>
        </section>
      </div>
    </WorkspaceLayout>
  );
}
