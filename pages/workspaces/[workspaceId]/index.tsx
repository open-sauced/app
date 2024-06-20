import dynamic from "next/dynamic";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useLocalStorage } from "react-use";
import { useEffect, useState } from "react";
import * as Sentry from "@sentry/nextjs";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import Repositories from "components/organisms/Repositories/repositories";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { useWorkspacesRepoStats } from "lib/hooks/api/useWorkspacesRepoStats";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { EmptyState } from "components/Workspaces/TrackedReposTable";
import Card from "components/atoms/Card/card";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import Button from "components/shared/Button/button";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";
import { WorkspaceOgImage, getWorkspaceOgImage } from "components/Workspaces/WorkspaceOgImage";
import { useHasMounted } from "lib/hooks/useHasMounted";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import { StarSearchEmbed } from "components/StarSearch/StarSearchEmbed";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { FeatureFlagged } from "components/shared/feature-flagged";
import { FeatureFlag, getAllFeatureFlags } from "lib/utils/server/feature-flags";

const SUGGESTIONS = [
  {
    title: "Find experts in your contributor base",
    prompt: "Are there any contributors that have worked with React Components in the last year?",
  },
  {
    title: "Discover trends in your repositories",
    prompt: "What were the fastest growing repositories in my workspace in the last 60 days?",
  },
  {
    title: "Identify potential issues",
    prompt: "Are there any repositories that have a very high lottery factor?",
  },
  {
    title: "Uncover contributors to highlight",
    prompt: "Are there contributors in my workspace that have been working on relevant contributions?",
  },
];

const WorkspaceWelcomeModal = dynamic(() => import("components/Workspaces/WorkspaceWelcomeModal"));
const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;

  if (!workspaceId) {
    Sentry.captureException(new Error(`Invalid workspaceId ${context.req.url}`));
    return { notFound: true };
  }

  const range = context.query.range ? Number(context.query.range as string) : 30;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });
  const { data: workspaceMembers } = await fetchApiData<{ data?: WorkspaceMember[] }>({
    path: `workspaces/${workspaceId}/members`,
    bearerToken,
    pathValidator: () => true,
  });

  const userId = Number(session?.user.user_metadata.sub);

  const isOwner = !!(workspaceMembers?.data || []).find(
    (member) => member.role === "owner" && member.user_id === userId
  );

  if (error) {
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  const ogImage = new URL(
    getWorkspaceOgImage(data as Workspace, range),
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  );

  const featureFlags = await getAllFeatureFlags(userId);

  return {
    props: {
      workspace: data,
      isOwner,
      overLimit: !!data?.exceeds_upgrade_limits,
      ogImage: `${ogImage.href}`,
      bearerToken,
      userId,
      featureFlags,
    },
  };
};

interface WorkspaceDashboardProps {
  userId: number;
  workspace: Workspace;
  ogImage: string;
  isOwner: boolean;
  overLimit: boolean;
  bearerToken: string;
  featureFlags: Record<FeatureFlag, boolean>;
}

const WorkspaceDashboard = ({
  workspace,
  ogImage,
  isOwner,
  overLimit,
  bearerToken,
  userId,
  featureFlags,
}: WorkspaceDashboardProps) => {
  const [showWelcome, setShowWelcome] = useLocalStorage("show-welcome", true);
  const hasMounted = useHasMounted();

  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const { data: repositories, error: hasError } = useGetWorkspaceRepositories({ workspaceId: workspace.id, range });

  const [filteredRepositories, setFilteredRepositories] = useState<OptionKeys[]>([]);
  const filterOptions = repositories
    ? Array.from(repositories?.data!, (repo) => {
        return { label: repo.repo.full_name, value: `${repo.repo_id}` };
      })
    : [];

  const [repoIds, setRepoIds] = useState(repositories?.data?.map((repo) => repo.repo_id) || []);
  let {
    data: stats,
    isError: isStatsError,
    isLoading: isLoadingStats,
  } = useWorkspacesRepoStats(
    workspace.id,
    range,
    filteredRepositories.length > 0 ? filteredRepositories.map((repo) => repo.label) : []
  );

  const showBanner = isOwner && overLimit;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setRepoIds(
      filteredRepositories.length > 0
        ? filteredRepositories.map((repo) => Number.parseInt(repo.value))
        : repositories?.data?.map((repo) => repo.repo_id) || []
    );
  }, [repositories, filteredRepositories]);

  if (workspace.is_public && !hasMounted) {
    return <WorkspaceOgImage workspace={workspace} ogImage={ogImage} />;
  }

  return (
    <>
      {workspace.is_public ? <WorkspaceOgImage workspace={workspace} ogImage={ogImage} /> : null}
      <WorkspaceLayout
        workspaceId={workspace.id}
        banner={
          showBanner ? (
            <WorkspaceBanner workspaceId={workspace.id} openModal={() => setIsInsightUpgradeModalOpen(true)} />
          ) : null
        }
      >
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <WorkspaceHeader workspace={workspace} />
          <div className="grid gap-4 pt-3 border-b sm:flex">
            <WorkspacesTabList workspaceId={workspace.id} selectedTab={"repositories"} />
            <div className="flex items-center justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (overLimit) {
                    setIsInsightUpgradeModalOpen(true);
                    return;
                  }

                  router.push(`/workspaces/${workspace.id}/settings#load-wizard`);
                }}
              >
                Add repositories
              </Button>
              <DayRangePicker />
              <TrackedRepositoryFilter
                options={filterOptions}
                handleSelect={(selected: OptionKeys[]) => setFilteredRepositories(selected)}
              />
            </div>
          </div>
          <div className="grid gap-6 mt-6">
            <ClientOnly>
              {repoIds.length > 0 ? (
                <>
                  <div className="flex flex-col gap-6 lg:flex-row">
                    <RepositoryStatCard
                      type="pulls"
                      stats={stats?.data?.pull_requests}
                      isLoading={isLoadingStats}
                      hasError={isStatsError}
                    />
                    <RepositoryStatCard
                      type="issues"
                      stats={stats?.data?.issues}
                      isLoading={isLoadingStats}
                      hasError={isStatsError}
                    />
                    <RepositoryStatCard
                      type="engagement"
                      stats={stats?.data?.repos}
                      isLoading={isLoadingStats}
                      hasError={isStatsError}
                    />
                  </div>
                  <Repositories repositories={repoIds} showSearch={false} />
                </>
              ) : (
                <Card className="bg-transparent">
                  <EmptyState
                    onAddRepos={() => {
                      if (overLimit) {
                        setIsInsightUpgradeModalOpen(true);
                        return;
                      }

                      router.push(`/workspaces/${workspace.id}/settings#load-wizard`);
                    }}
                  />
                </Card>
              )}
            </ClientOnly>
          </div>

          <WorkspaceWelcomeModal
            isOpen={showWelcome!}
            onClose={() => {
              setShowWelcome(false);
            }}
          />
          <InsightUpgradeModal
            workspaceId={workspace.id}
            variant="contributors"
            isOpen={isInsightUpgradeModalOpen}
            onClose={() => setIsInsightUpgradeModalOpen(false)}
            overLimit={10}
          />
        </div>
      </WorkspaceLayout>
      <FeatureFlagged flag="starsearch-workspaces" featureFlags={featureFlags}>
        <StarSearchEmbed
          userId={userId}
          bearerToken={bearerToken}
          suggestions={SUGGESTIONS}
          isMobile={isMobile}
          // TODO: implement once we have shared chats in workspaces
          sharedChatId={null}
          tagline="Ask anything about your workspace"
        />
      </FeatureFlagged>
    </>
  );
};

export default WorkspaceDashboard;
