import { useEffect } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Link from "next/link";
import { BsPencilFill } from "react-icons/bs";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import InsightRow from "components/molecules/InsightRow/insight-row";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import GitHubIcon from "img/icons/github-icon.svg";

import HubLayout from "layouts/hub";
import { WithPageLayout } from "interfaces/with-page-layout";
import useUserInsights from "lib/hooks/useUserInsights";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import useStore from "lib/store";
import useSession from "lib/hooks/useSession";
import { useToast } from "lib/hooks/useToast";
import Text from "components/atoms/Typography/text";
import Card from "components/atoms/Card/card";
import getPercent from "lib/utils/get-percent";
import Pill from "components/atoms/Pill/pill";
import { getRelativeDays } from "lib/utils/date-utils";
import CardRepoList, { RepoList } from "components/molecules/CardRepoList/card-repo-list";
import Button from "components/atoms/Button/button";
import Icon from "components/atoms/Icon/icon";
import Title from "components/atoms/Typography/title";

const staticRepos: RepoList[] = [
  {
    repoOwner: "vercel",
    repoName: "next.js",
    repoIcon: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
  },
  {
    repoIcon: "https://avatars.githubusercontent.com/u/69631?s=200&v=4",
    repoOwner: "facebook",
    repoName: "react",
  },
  {
    repoName: "freeCodeCamp",
    repoOwner: "freeCodeCamp",
    repoIcon: "https://avatars.githubusercontent.com/u/9892522?s=200&v=4",
  },
  {
    repoName: "node",
    repoOwner: "nodejs",
    repoIcon: "https://avatars.githubusercontent.com/u/9950313?s=200&v=4",
  },
];

const InsightsHub: WithPageLayout = () => {
  const router = useRouter();
  const { user, signIn } = useSupabaseAuth();
  const store = useStore();
  const dismissFeaturedInsights = useStore((store) => store.dismissFeaturedInsights);
  const { toast } = useToast();
  const { session } = useSession(true);
  const { data, meta, isError, isLoading, setPage } = useUserInsights();

  function handleView() {
    const insight = data.slice(0, 1).shift();
    router.push(
      `/pages/${user ? user.user_metadata.user_name : "anonymous"}/${insight ? insight!.id : "734"}/dashboard`
    );
  }

  function openInsightToast() {
    const toaster = toast({
      description: "Welcome to your Insights Hub!",
      variant: "success",
      action: (
        <div className="flex flex-col">
          <div className="flex align-middle">
            <Text>
              We&apos;ve included a featured Insight Page for you to test out. You can also create your own to get
              insights on repositories.
            </Text>
          </div>
          <div className="flex flex-start">
            <button
              onClick={() => {
                toaster && toaster.dismiss();
              }}
            >
              <Text className="pr-2 cursor-pointer">Dismiss</Text>
            </button>
            <button
              onClick={() => {
                toaster && toaster.dismiss();
                handleView();
              }}
            >
              <Text className="text-orange-500 cursor-pointer">Open Insight Page</Text>
            </button>
          </div>
        </div>
      ),
    });

    store.setDismissFeaturedInsights();
  }

  useEffect(() => {
    if (session && session.insights_count === 0 && !dismissFeaturedInsights) {
      openInsightToast();
    }
  }, [session, user]);

  return (
    <>
      <section className="flex flex-col gap-4">
        {user ? (
          <>
            {isLoading ? (
              <SkeletonWrapper count={3} classNames="w-full" height={95} radius={10} />
            ) : isError ? (
              "Error..."
            ) : (
              data.map((insight) => {
                return <InsightRow key={`insights_${insight.id}`} user={user} insight={insight} />;
              })
            )}
          </>
        ) : null}

        {!user ? (
          <>
            <div className="w-full px-8">
              <div className="w-full">
                <Title level={4} className="text-2xl">
                  Insights Hub
                </Title>
                <Text className="text-base ">
                  Welcome to the Insights Hub, we&apos;ve included a featured Insight Page for you to test out. You can
                  also create your own to get insights on repositories.
                </Text>
              </div>
              <Card className="flex flex-col md:flex-row w-full rounded-lg px-4 lg:px-8 py-5 gap-4 lg:gap-2 bg-white items-center mt-4">
                <>
                  <div className="flex w-full flex-1 flex-col gap-4 lg:gap-6">
                    <div className="flex items-center lg:items-center gap-4 ">
                      <div className="w-4 h-4 bg-light-orange-10 rounded-full"></div>
                      <div className="text-xl text-light-slate-12 flex justify-between">
                        <Link href={`/pages/anonymous/734/dashboard`}>Top 10 Javascript Repos</Link>
                      </div>
                      <div className="rounded-2xl border px-2 text-light-slate-11">public</div>
                      <div className="flex-1 md:hidden">
                        <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border mr-2">
                          <Link href={`/hub/insights/734/edit`}>
                            <BsPencilFill
                              title="Edit Insight Page"
                              className="text-light-slate-10 text-md cursor-pointer w-4"
                            />
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="w-full truncate">
                      <CardRepoList limit={3} repoList={staticRepos} total={10} />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-8 w-full">
                      {/* Average Prs opened section */}
                      <div className="flex flex-col gap-2 min-w-[120px] flex-1">
                        <span className="text-xs text-light-slate-11">Avg PRs opened</span>
                        <div
                          className="flex text-light-grass-10 items-center  gap-6
            "
                        >
                          <Text className="md:!text-lg lg:!text-2xl !text-black !leading-none">{`${50} PR${
                            50 > 1 ? "s" : ""
                          }`}</Text>
                          <Pill color="green" text={`${getPercent(300, 23)}%`} />
                        </div>
                      </div>

                      {/* Average Pr Velocity section */}
                      <div className="flex-1 gap-2 flex flex-col  min-w-[150px]">
                        <span className="text-xs text-light-slate-11">Avg PRs velocity</span>
                        <div className="flex text-light-grass-10 items-center  gap-6">
                          <Text className="md:!text-lg lg:!text-2xl !tracking-widest !text-black !leading-none">
                            {getRelativeDays(Math.round(24 / 16))}
                          </Text>
                          <Pill color="purple" text={`${getPercent(300, 40)}%`} />
                        </div>
                      </div>
                      <div className="flex-1 hidden md:flex  justify-end">
                        <Link href="/pages/anonymous/734/dashboard">
                          <span className=" bg-light-slate-1 inline-block rounded-lg p-2.5 border cursor-pointer">
                            <MdOutlineArrowForwardIos
                              title="Go To Insight Page"
                              className="text-light-slate-10 text-lg"
                            />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              </Card>
              <div className="flex flex-col items-center justify-center w-full mt-10 gap-4">
                <Text className="text-2xl font-bold text-center">Sign in to create your own Insights</Text>
                <Button
                  onClick={() => {
                    signIn({
                      provider: "github",
                      options: {
                        redirectTo: "/hub/insights",
                      },
                    });
                  }}
                  variant="primary"
                  className="px-8"
                >
                  Connect <span className="hidden sm:inline-block ml-1">with GitHub</span>
                  <Icon IconImage={GitHubIcon} className="ml-2" />
                </Button>
              </div>
            </div>
          </>
        ) : null}
      </section>

      <div
        className={clsx("py-1 md:py-4 flex w-full md:mt-5 justify-between items-center", {
          hidden: meta.itemCount <= meta.limit,
        })}
      >
        <PaginationResults metaInfo={meta} total={meta.itemCount} entity={"insights"} />
        <Pagination
          pages={[]}
          hasNextPage={meta.hasNextPage}
          hasPreviousPage={meta.hasPreviousPage}
          totalPage={meta.pageCount}
          page={meta.page}
          onPageChange={function (page: number): void {
            setPage(page);
          }}
          divisor={true}
          goToPage
        />
      </div>
    </>
  );
};

InsightsHub.PageLayout = HubLayout;
InsightsHub.isPrivateRoute = false;
InsightsHub.SEO = {
  title: "Insights Hub | Open Sauced Insights",
};

export default InsightsHub;
