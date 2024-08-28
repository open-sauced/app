import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Card from "components/atoms/Card/card";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";
import UserRepositoryRecommendations from "components/organisms/UserRepositoryRecommendations/user-repository-recommendations";
import Button from "components/shared/Button/button";
import useRepositories from "lib/hooks/api/useRepositories";
import { useFetchUser } from "lib/hooks/useFetchUser";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

export default function ExploreHomePage() {
  const { session } = useSession(true);
  const { data: user } = useFetchUser(session ? session.user_name ?? "" : "");
  const { signIn } = useSupabaseAuth();

  const {
    data: trendingRepositories,
    isLoading: isTrendingLoading,
    isError: isTrendingError,
  } = useRepositories([], 30, 10);

  return (
    <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
      <div className="px-4 py-8 lg:px-16 lg:py-12 flex flex-col gap-12 w-full lg:max-w-8xl">
        <section className="flex flex-col items-center w-full gap-8">
          <h1 className="text-4xl font-medium">Explore Open Source Repositories</h1>
          <Search name="Explore repositories" className="h-12 w-full max-w-6xl" />
        </section>

        <section className="flex flex-col gap-8 ">
          <Title>Trending repositories</Title>
          <section className="flex flex-nowrap gap-4 overflow-x-scroll">
            {trendingRepositories &&
              trendingRepositories.map((repo) => (
                <RecommendedRepoCard key={`repo_card_${repo.id}`} fullName={repo.full_name} className="min-w-[24rem]" />
              ))}
          </section>
        </section>

        <section className="flex flex-col gap-8">
          <Title>Recommended for You</Title>
          <section className="grid grid-flow-col-dense gap-4 w-full max-w-screen lg:w-5xl overflow-x-scroll items-stretch">
            {session ? (
              <UserRepositoryRecommendations contributor={session} userInterests={user ? user.interests : ""} />
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  signIn({ provider: "github" });
                }}
              >
                Hello
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
