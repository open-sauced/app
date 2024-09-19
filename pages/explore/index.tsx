import { TbFileDescription } from "react-icons/tb";
import WorkspaceCard from "components/Workspaces/WorkspaceCard";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import Title from "components/atoms/Typography/title";
import RecommendedRepoCard from "components/molecules/RecommendedRepoCard/recommended-repo-card";
import Button from "components/shared/Button/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "components/shared/Carousel";
import useFetchTrendingRepositories from "lib/hooks/useFetchTrendingRepositories";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useUserRepoRecommendations from "lib/hooks/useUserRepoRecommendations";
import { SearchDialogTrigger } from "components/organisms/SearchDialog/search-dialog";

export const FEATURED_WORKSPACES = [
  "b355ecef-76a5-4451-972a-281e16ccf2e4", // Brandon's "Angular"
  "0950814d-ed16-4201-add8-d17479cfdc1f", // Zeu's "OSS Companies"
  "190972f6-caa8-4a90-a21d-2322259b90c7", // Bekah's "CNCF Top 30"
  "4835f232-ec69-474d-9b88-b2b779015e08", // John's "Go Hotness"
  "7b540a5d-a767-4f8f-8295-2eccf31ca568", // Brian's "Vite Ecosystem"
  "380d1129-cd99-4958-83c7-f5d8c4f778af", // Nick's "Daishi's Greatest Hits"
];

export default function ExploreHomePage() {
  const { signIn } = useSupabaseAuth();
  const { session } = useSession(true);

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
            relative flex flex-col items-center w-full gap-8 py-8 lg:px-8 lg:py-24
            bg-[url('~/img/explore-page-header.png')] bg-center bg-cover rounded-2xl
          `}
        >
          <h1 className="text-2xl lg:text-4xl font-medium text-white">
            Explore
            <span className="bg-gradient-to-r from-gradient-orange-one to-gradient-orange-two bg-clip-text text-transparent font-bold">
              {" "}
              Open Source
            </span>
          </h1>
          <SearchDialogTrigger
            hideSmallIcon
            className="!mx-auto !flex !h-12 !w-full !max-w-[20rem] lg:!max-w-3xl !items-center !place-items-center"
          />
        </section>

        <section className="flex flex-col gap-8">
          <Title>Trending repositories</Title>
          <Carousel opts={{ slidesToScroll: "auto" }} className="flex flex-col gap-8">
            <CarouselContent className="justify-items-stretch pr-8">
              {trendingRepositories &&
                trendingRepositories.map((repo) => (
                  <CarouselItem key={`trending_${repo.repo_name}`} className="lg:!basis-1/3 min-w-[24rem] h-full">
                    <RecommendedRepoCard fullName={repo.repo_name} className="h-56" />
                  </CarouselItem>
                ))}
            </CarouselContent>

            <div className="relative flex gap-4 self-end">
              <CarouselPrevious className="relative !border !border-slate-300 !text-black !left-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
              <CarouselNext className="relative !border !border-slate-300 !text-black !right-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
            </div>
          </Carousel>
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Title>Recommended for You</Title>
            <p>
              {session
                ? "Here are some repositories we think would be great for you. Click on one to start contributing!"
                : "Log in to get personalized recommendations on repositories to contribute to!"}
            </p>
          </div>
          {session ? (
            <Carousel opts={{ slidesToScroll: "auto" }} className="flex flex-col gap-8">
              <CarouselContent className="justify-items-stretch pr-8">
                {recommendations &&
                  recommendations.map((repo) => (
                    <CarouselItem
                      key={`recommendation_${repo.full_name}`}
                      className="lg:!basis-1/3 min-w-[24rem] h-full"
                    >
                      <RecommendedRepoCard fullName={repo.full_name} className="h-56" />
                    </CarouselItem>
                  ))}
              </CarouselContent>

              <div className="relative flex gap-4 self-end">
                <CarouselPrevious className="relative !border !border-slate-300 !text-black !left-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
                <CarouselNext className="relative !border !border-slate-300 !text-black !right-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
              </div>
            </Carousel>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                signIn({ provider: "github" });
              }}
              className="w-fit"
            >
              Connect with GitHub
            </Button>
          )}
        </section>

        <section className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:basis-1/3 flex flex-col gap-4">
            <Title>Discover Workspaces</Title>
            <p>
              Access insights into collections of repositories. Check out our top picks curated by the OpenSauced team!
            </p>
            <a
              href="https://opensauced.pizza/docs/features/workspaces/"
              target="_blank"
              className="flex gap-2 items-center text-slate-500 text-sm hover:underline"
            >
              <TbFileDescription />
              Learn how to use Workspaces for your project
            </a>
            {session ? (
              <Button variant="primary" href="/workspaces/new" className="w-fit">
                Create a new Workspace
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  if (!session) {
                    signIn({
                      provider: "github",
                      options: { redirectTo: new URL("/workspaces/new", window.location.origin).toString() },
                    });
                  }
                }}
                className="w-fit"
              >
                Log in to create Workspaces
              </Button>
            )}
          </div>

          <Carousel opts={{ slidesToScroll: "auto" }} className="flex flex-col gap-8 w-full lg:basis-2/3">
            <CarouselContent className="justify-items-stretch pr-8">
              {FEATURED_WORKSPACES.map((workspaceId) => (
                <CarouselItem key={`workspace_card_{workspaceId}`} className="lg:!basis-1/2 min-w-[24rem] h-full">
                  <WorkspaceCard workspaceId={workspaceId} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative flex gap-4 self-end">
              <CarouselPrevious className="relative !border !border-slate-300 !text-black !left-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
              <CarouselNext className="relative !border !border-slate-300 !text-black !right-0 bg-white rounded-full !w-8 h-8 pl-[0.425rem]" />
            </div>
          </Carousel>
        </section>
      </div>
    </WorkspaceLayout>
  );
}
