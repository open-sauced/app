import { FiCopy } from "react-icons/fi";
import { MdWorkspaces } from "react-icons/md";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaBalanceScale } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { GetServerSidePropsContext } from "next";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import useSession from "lib/hooks/useSession";
import { useToast } from "lib/hooks/useToast";
import { shortenUrl } from "lib/utils/shorten-url";
import { fetchApiData } from "helpers/fetchApiData";
import { getAvatarByUsername } from "lib/utils/github";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { setQueryParams } from "lib/utils/query-params";
import { writeToClipboard } from "lib/utils/write-to-clipboard";
import { useRepoStats } from "lib/hooks/api/useRepoStats";
import { useRepositoryRoss } from "lib/hooks/api/useRepositoryRoss";
import { useRepositoryYolo } from "lib/hooks/api/useRepositoryYolo";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";
import { useRepositoryLottoFactor } from "lib/hooks/api/useRepositoryLottoFactor";

import Avatar from "components/atoms/Avatar/avatar";
import Button from "components/shared/Button/button";
import Pill from "components/atoms/Pill/pill";
import TabList from "components/TabList/tab-list";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import PRChart from "components/Graphs/PRChart";
import StarsChart from "components/Graphs/StarsChart";
import ForksChart from "components/Graphs/ForksChart";
import IssuesChart from "components/Graphs/IssuesChart";
import ContributorConfidenceChart from "components/Repositories/ContributorConfidenceChart";
import RossChart from "components/Repositories/RossChart";
import YoloChart from "components/Repositories/YoloChart";
import LanguagePill, { getLanguageTopic } from "components/shared/LanguagePill/LanguagePill";
import OssfChart from "components/Repositories/OssfChart";
import LotteryFactorChart from "components/Repositories/LotteryFactorChart";
import { CopyContainer } from "components/shared/CopyContainer";
import CopyImageBranding from "components/shared/CopyImageBranding";
import { getRepositoryOgImage, RepositoryOgImage } from "components/Repositories/RepositoryOgImage";
import { SplitButton } from "components/shared/SplitButton";

const AddToWorkspaceModal = dynamic(() => import("components/Repositories/AddToWorkspaceModal"), {
  ssr: false,
});
const AddToWorkspaceDrawer = dynamic(() => import("components/Repositories/AddToWorkspaceDrawer"), {
  ssr: false,
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { org, repo } = context.params ?? { org: "", repo: "" };
  const range = (context.query.range ? Number(context.query.range) : 30) as Range;

  const { data: repoData, error } = await fetchApiData<DbRepo>({
    path: `repos/${org}/${repo}/info`,
  });

  if (!repoData || error) {
    return { notFound: true };
  }

  const { href: ogImageUrl } = new URL(
    getRepositoryOgImage({
      description: repoData.description,
      fullRepoName: repoData.full_name,
      range,
    }),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  // Cache for two hours
  context.res.setHeader("Netlify-CDN-Cache-Control", "public, max-age=0, stale-while-revalidate=7200");
  context.res.setHeader("Netlify-Vary", "query=range");
  context.res.setHeader("Cache-Tag", `repo-pages,repo-page-${repoData.id}`);

  return { props: { repoData, ogImageUrl } };
}

type Range = 30 | 7 | 90 | 180 | 360;

interface RepoPageProps {
  repoData: DbRepoInfo;
  ogImageUrl: string;
}

export default function RepoPage({ repoData, ogImageUrl }: RepoPageProps) {
  const syncId = repoData.id;

  const issuesChartSyncId = uuidv4();
  const prChartSyncId = uuidv4();
  const startsChartSyncId = uuidv4();
  const forksChartSyncId = uuidv4();

  const router = useRouter();
  const { toast } = useToast();
  const posthog = usePostHog();
  const { session } = useSession(true);
  const [sbomUrl, setSbomUrl] = useState<string | undefined>();
  const isMobile = useMediaQuery("(max-width: 576px)");
  const avatarUrl = getAvatarByUsername(repoData.full_name.split("/")[0], 96);
  const [lotteryState, setLotteryState] = useState<"lottery" | "yolo">("lottery");
  const yoloHideBots = router.query.hideBots === "true";
  const [isAddToWorkspaceModalOpen, setIsAddToWorkspaceModalOpen] = useState(false);
  const range = (router.query.range ? Number(router.query.range) : 30) as Range;
  const tabList = [
    { name: "Overview", path: "" },
    { name: "Contributors", path: "contributors" },
  ];

  function setYoloHideBots(value: boolean) {
    setQueryParams({ hideBots: `${value}` });
  }

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

  const {
    data: contributorStats,
    isLoading: isContributorDataLoading,
    error: contributorError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "contributors",
    range,
  });

  const {
    data: issueStats,
    isLoading: isIssueDataLoading,
    error: issueError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "issues",
    range,
  });

  const {
    data: prStats,
    isLoading: isPrDataLoading,
    error: prError,
  } = useFetchMetricStats({
    repository: repoData.full_name,
    variant: "prs",
    range,
  });

  const {
    data: rossStats,
    isLoading: isRossDataLoading,
    error: rossError,
  } = useRepositoryRoss({
    repository: repoData.full_name,
    range,
  });

  const contributorRangedTotal = contributorStats?.reduce((prev, curr) => prev + curr.contributor_count!, 0);
  const { data: repoStats, isError, isLoading } = useRepoStats({ repoFullName: repoData.full_name, range });

  const {
    data: lotteryFactor,
    error: lotteryFactorError,
    isLoading: isLotteryFactorLoading,
  } = useRepositoryLottoFactor({ repository: repoData.full_name.toLowerCase(), range });

  const {
    data: yoloStats,
    error: yoloStatsError,
    isLoading: isYoloStatsLoading,
  } = useRepositoryYolo({
    repository: repoData.full_name.toLowerCase(),
    range,
    includeBots: !yoloHideBots,
  });

  const uniqueYoloCoders = useMemo(() => {
    if (!yoloStats || !yoloStats.data) {
      return new Set<string>();
    }
    const unique = new Set<string>();
    yoloStats.data.forEach(({ actor_login }) => {
      unique.add(actor_login);
    });

    return unique;
  }, [yoloStats]);

  const copyUrlToClipboard = async () => {
    const url = new URL(window.location.href).toString();
    posthog!.capture("clicked: repo page share button", {
      repo_name: repoData.full_name,
    });

    try {
      const shortUrl = await shortenUrl(url);
      writeToClipboard(shortUrl);
      toast({ description: "Copied to clipboard.", variant: "success" });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <>
      <RepositoryOgImage repository={repoData} ogImageUrl={ogImageUrl} />
      <WorkspaceLayout workspaceId={session ? session.personal_workspace_id : "new"}>
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <ClientOnly>
            <section className="flex flex-col gap-2 px-2 pt-2 md:py-4 md:px-4 md:gap-4 lg:gap-8 w-fit xl:w-full xl:max-w-8xl">
              <div className="flex flex-col items-center justify-between w-full gap-4 lg:flex-row">
                <header className="flex items-center gap-4">
                  <Avatar size={96} avatarURL={avatarUrl} className="min-w-[96px]" />
                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://github.com/${repoData.full_name}`}
                      target="_blank"
                      className="flex items-center gap-2 text-xl font-bold group hover:underline underline-offset-2 md:text-3xl"
                    >
                      <h1>{repoData.full_name}</h1>
                      <HiOutlineExternalLink className="text-lg group-hover:text-sauced-orange lg:text-xl" />
                    </a>
                    <p>{repoData.description}</p>
                  </div>
                </header>
                <div className="flex flex-col items-end self-end gap-2">
                  {isMobile ? (
                    <>
                      <AddToWorkspaceDrawer repository={repoData.full_name} />
                      <AddToWorkspaceDrawer type="sbom" repository={repoData.full_name} />
                    </>
                  ) : (
                    <SplitButton
                      align="end"
                      label="add-to-workspace"
                      actions={[
                        {
                          icon: MdWorkspaces,
                          label: "Add to Workspace",
                          onClick: () => {
                            posthog.capture("Repo Pages: clicked 'Add to Workspace'", {
                              repository: repoData.full_name,
                            });
                            setIsAddToWorkspaceModalOpen(true);
                          },
                        },
                        {
                          icon: MdWorkspaces,
                          label: "Create Workspace from SBOM",
                          onClick: () => {
                            posthog.capture("Repo Pages: clicked 'Create Workspace from SBOM'", {
                              repository: repoData.full_name,
                            });

                            const params = new URLSearchParams();
                            params.set("sbom", "true");
                            params.set("repo", repoData.full_name);

                            const url = `/workspaces/new?${params}`;

                            if (!session) {
                              setSbomUrl(new URL(url, window.location.origin).toString());
                              setIsAddToWorkspaceModalOpen(true);
                              return;
                            }

                            router.push(url);
                          },
                        },
                      ]}
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      aria-label="share"
                      variant="outline"
                      onClick={copyUrlToClipboard}
                      className="items-center gap-2 my-auto shrink-0 place-self-end"
                    >
                      <FiCopy />
                      Share
                    </Button>
                    <DayRangePicker
                      onDayRangeChanged={(value: string) =>
                        posthog.capture("Repo Pages: changed range", {
                          repository: repoData.full_name,
                          range: Number(value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="relative flex w-fit max-w-[21rem] lg:w-full lg:max-w-full gap-2 overflow-x-scroll lg:overflow-auto">
                {repoData.language && (
                  <Link
                    href={`/explore/topic/${getLanguageTopic(repoData.language)}/dashboard`}
                    onClick={() =>
                      posthog.capture("Repo Pages: clicked language pill", {
                        repository: repoData.full_name,
                        language: repoData.language,
                      })
                    }
                  >
                    <LanguagePill language={repoData.language.toLowerCase()} />
                  </Link>
                )}
                {repoData.license && (
                  <Pill text={repoData.license} icon={<FaBalanceScale />} size="xsmall" className="whitespace-nowrap" />
                )}
                <Pill
                  text={`Last Updated: ${new Date(repoData.pushed_at).toLocaleDateString()}`}
                  icon={<FaRegClock />}
                  size="xsmall"
                  className="!px-2 whitespace-nowrap"
                />
              </div>
            </section>
          </ClientOnly>

          <div className="mb-4 border-b">
            <TabList tabList={tabList} selectedTab={"overview"} pageId={`/s/${repoData.full_name}`} />
          </div>

          <ClientOnly>
            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4 lg:grid lg:grid-cols-12 lg:max-h-[50rem]">
                <div className="flex flex-col gap-4 lg:col-span-8">
                  <div className="flex flex-col h-full gap-4 lg:flex-row">
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Contributor Confidence chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        windowWidth: 1700,
                        allowTaint: true,
                        onclone(document, element) {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                          element.querySelector("ContributorConfidenceChart")?.classList.add("z-20");
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <ContributorConfidenceChart
                        contributorConfidence={repoStats?.contributor_confidence}
                        isError={isError}
                        isLoading={isLoading}
                        onLearnMoreClick={() =>
                          posthog.capture("Repo Pages: clicked Contributor Confidence docs", {
                            repository: repoData.full_name,
                          })
                        }
                      />
                    </CopyContainer>
                    {!repoData.ossf_scorecard_total_score ? (
                      <OssfChart
                        repository={repoData.full_name}
                        totalScore={repoData.ossf_scorecard_total_score}
                        dependencyUpdateScore={repoData.ossf_scorecard_dependency_update_score}
                        maintainedScore={repoData.ossf_scorecard_maintained_score}
                        fuzzingScore={repoData.ossf_scorecard_fuzzing_score}
                        isLoading={false}
                        isError={!repoData.ossf_scorecard_total_score}
                      />
                    ) : (
                      <CopyContainer
                        onCopyClick={() => {
                          posthog.capture("Repo Pages: copied OSSF Scorecard", {
                            repository: repoData.full_name,
                          });
                        }}
                        options={{
                          windowWidth: 1700,
                          allowTaint: true,
                          onclone: (document, element) => {
                            element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                              el.classList.remove("hidden");
                            });
                          },
                        }}
                      >
                        <CopyImageBranding repository={repoData.full_name} />
                        <OssfChart
                          repository={repoData.full_name}
                          totalScore={repoData.ossf_scorecard_total_score}
                          dependencyUpdateScore={repoData.ossf_scorecard_dependency_update_score}
                          maintainedScore={repoData.ossf_scorecard_maintained_score}
                          fuzzingScore={repoData.ossf_scorecard_fuzzing_score}
                          isLoading={false}
                          isError={!repoData.ossf_scorecard_total_score}
                        />
                      </CopyContainer>
                    )}
                  </div>

                  <CopyContainer
                    onCopyClick={() => {
                      posthog.capture("Repo Pages: copied Contributors (ROSS) chart", {
                        repository: repoData.full_name,
                      });
                    }}
                    options={{
                      windowWidth: 1700,
                      allowTaint: true,
                      onclone(document, element) {
                        element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                          el.classList.remove("hidden");
                        });
                        element.querySelectorAll("[data-copy-image-legend-square]").forEach((el) => {
                          el.classList.replace("w-4", "w-5");
                          el.classList.replace("h-4", "h-5");
                        });
                      },
                    }}
                  >
                    <CopyImageBranding repository={repoData.full_name} />
                    <RossChart
                      stats={rossStats}
                      range={range}
                      isLoading={isRossDataLoading}
                      error={rossError}
                      onFilterClick={(category, value) =>
                        posthog.capture(`Repo Data: toggled ROSS filter`, {
                          repository: repoData.full_name,
                          category,
                          value,
                        })
                      }
                      className="h-fit"
                    />
                  </CopyContainer>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-4">
                  {lotteryState === "lottery" && (
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Lottery Factor chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        windowWidth: 1700,
                        allowTaint: true,
                        onclone: (document, element) => {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                          element.querySelector("LotteryFactorChart")?.classList.add("z-20");
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <LotteryFactorChart
                        lotteryFactor={lotteryFactor}
                        error={lotteryFactorError}
                        range={range}
                        isLoading={isLotteryFactorLoading}
                        showHoverCards
                        uniqueYoloCoders={uniqueYoloCoders}
                        yoloBannerOnClick={
                          uniqueYoloCoders.size > 0
                            ? () => {
                                setLotteryState("yolo");
                                posthog.capture(`Repo Pages: YOLO banner clicked`, { repository: repoData.full_name });
                              }
                            : undefined
                        }
                        onYoloIconClick={() => {
                          setLotteryState("yolo");
                          posthog.capture(`Repo Pages: YOLO icon clicked`, { repository: repoData.full_name });
                        }}
                        onProfileClick={() => {
                          posthog.capture(`Repo Pages: Lottery Factor user clicked`, {
                            repository: repoData.full_name,
                          });
                        }}
                      />
                    </CopyContainer>
                  )}
                  {lotteryState === "yolo" && (
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Lottery Factor chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        windowWidth: 1700,
                        allowTaint: true,
                        onclone: (document, element) => {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <YoloChart
                        yoloStats={yoloStats}
                        uniqueYoloCoders={uniqueYoloCoders}
                        yoloHideBots={yoloHideBots}
                        setYoloHideBots={setYoloHideBots}
                        repository={repoData.full_name}
                        isLoading={isYoloStatsLoading}
                        range={range}
                        backButtonOnClick={() => setLotteryState("lottery")}
                        onShaClick={() =>
                          posthog.capture("Repo Pages: clicked SHA link", { repository: repoData.full_name })
                        }
                        onProfileClick={() =>
                          posthog.capture("Repo Pages: clicked YOLO coder (YOLO Chart)", {
                            repository: repoData.full_name,
                          })
                        }
                        onHideBotsToggle={(checked) =>
                          posthog.capture("Repo Pages: toggled YOLO hide bots", {
                            repository: repoData.full_name,
                            checked,
                          })
                        }
                        showHoverCards
                      />
                    </CopyContainer>
                  )}
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Activity</h2>
                <div className="flex flex-col gap-4 lg:grid lg:grid-cols-12">
                  <div className="block lg:col-span-6 h-fit">
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Issues chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        allowTaint: true,
                        onclone(document, element) {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <IssuesChart
                        stats={issueStats}
                        range={range}
                        velocity={repoStats?.issues_velocity_count ?? 0}
                        syncId={issuesChartSyncId}
                        isLoading={isIssueDataLoading}
                      />
                    </CopyContainer>
                  </div>

                  <div className="lg:col-span-6 h-fit">
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied PR chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        allowTaint: true,
                        onclone: (document, element) => {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <PRChart
                        stats={prStats}
                        range={range}
                        velocity={repoStats?.pr_velocity_count ?? 0}
                        syncId={prChartSyncId}
                        isLoading={isPrDataLoading}
                      />
                    </CopyContainer>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold">Engagement</h2>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-6 h-fit">
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Stars chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        allowTaint: true,
                        onclone: (document, element) => {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <StarsChart
                        stats={starsData}
                        total={repoData.stars}
                        range={range}
                        syncId={startsChartSyncId}
                        isLoading={isStarsDataLoading}
                        onCategoryClick={(category) =>
                          posthog.capture("Repo Pages: clicked Stars Chart category", {
                            repository: repoData.full_name,
                            category,
                          })
                        }
                        className="lg:col-span-6 h-fit"
                      />
                    </CopyContainer>
                  </div>

                  <div className="lg:col-span-6 h-fit">
                    <CopyContainer
                      onCopyClick={() => {
                        posthog.capture("Repo Pages: copied Forks chart", {
                          repository: repoData.full_name,
                        });
                      }}
                      options={{
                        allowTaint: true,
                        onclone: (document, element) => {
                          element.querySelectorAll("[data-copy-image-branding]").forEach((el) => {
                            el.classList.remove("hidden");
                          });
                        },
                      }}
                    >
                      <CopyImageBranding repository={repoData.full_name} />
                      <ForksChart
                        stats={forkStats}
                        total={repoData.forks}
                        range={range}
                        syncId={forksChartSyncId}
                        isLoading={isForksDataLoading}
                        onCategoryClick={(category) =>
                          posthog.capture("Repo Pages: clicked Forks Chart category", {
                            repository: repoData.full_name,
                            category,
                          })
                        }
                      />
                    </CopyContainer>
                  </div>
                </div>
              </section>
            </div>
          </ClientOnly>
        </div>
      </WorkspaceLayout>

      <AddToWorkspaceModal
        sbomUrl={sbomUrl}
        repository={repoData.full_name}
        isOpen={isAddToWorkspaceModalOpen}
        onCloseModal={() => setIsAddToWorkspaceModalOpen(false)}
      />
    </>
  );
}
