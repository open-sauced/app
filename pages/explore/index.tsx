import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Card from "components/atoms/Card/card";
import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";
import Button from "components/shared/Button/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/shared/Carousel";
import { fetchApiData } from "helpers/fetchApiData";
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

  const isRepoError = async (repoName: string) => {
    const response = await fetchApiData({ path: `repo/${repoName}` });
    return response.error;
  };

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

        <section className="flex flex-col gap-8">
          <Title>Trending repositories</Title>
          <Carousel opts={{ slidesToScroll: "auto" }} className="flex flex-col gap-8">
            <CarouselContent className="justify-items-stretch pr-8">
              {trendingRepositories &&
                trendingRepositories.map(
                  (repo) =>
                    !isRepoError(repo.repo_name) && (
                      <CarouselItem key={`repo_card_${repo.repo_name}`} className="!basis-1/3 min-w-[24rem] h-full">
                        <RecommendedRepoCard fullName={repo.repo_name} />
                      </CarouselItem>
                    )
                )}
            </CarouselContent>

            <div className="relative flex gap-4 self-end">
              <CarouselPrevious className="relative !border !border-slate-300 !text-black !left-0 bg-white rounded-full w-8 h-8 pl-[0.425rem]" />
              <CarouselNext className="relative !border !border-slate-300 !text-black !right-0 bg-white rounded-full w-8 h-8 pl-[0.425rem]" />
            </div>
          </Carousel>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Title>Recommended for You</Title>
            <p>Here are some repositories we think would be great for you. Click on one to start contributing!</p>
          </div>
          {session ? (
            <Carousel opts={{ slidesToScroll: "auto" }} className="flex flex-col gap-8">
              <CarouselContent className="justify-items-stretch pr-8">
                {recommendations &&
                  recommendations.map(
                    (repo) =>
                      !!isRepoError(repo.full_name) && (
                        <CarouselItem key={`repo_card_${repo.full_name}`} className="!basis-1/3 min-w-[24rem] h-full">
                          <RecommendedRepoCard fullName={repo.full_name} />
                        </CarouselItem>
                      )
                  )}
              </CarouselContent>

              <div className="relative flex gap-4 self-end">
                <CarouselPrevious className="relative !border !border-slate-300 !text-black !left-0 bg-white rounded-full w-8 h-8 pl-[0.425rem]" />
                <CarouselNext className="relative !border !border-slate-300 !text-black !right-0 bg-white rounded-full w-8 h-8 pl-[0.425rem]" />
              </div>
            </Carousel>
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
