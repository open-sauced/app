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
import { StarSearchEmbed } from "components/StarSearch/StarSearchEmbed";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { WORKSPACE_STARSEARCH_SUGGESTIONS } from "lib/utils/star-search";
import useSession from "lib/hooks/useSession";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useWorkspaceMembers } from "lib/hooks/api/useWorkspaceMembers";

const WorkspaceWelcomeModal = dynamic(() => import("components/Workspaces/WorkspaceWelcomeModal"));

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

  return {
    props: {
      workspace: data,
      ogImage: `${ogImage.href}`,
    },
  };
};

interface WorkspaceDashboardProps {
  workspace: Workspace;
  ogImage: string;
}

const WorkspaceDashboard = ({ workspace, ogImage }: WorkspaceDashboardProps) => {
  const { sessionToken, signIn, userId } = useSupabaseAuth();
  const {
    data: workspaceMembers = [],
    isLoading,
    isError,
  } = useWorkspaceMembers({ workspaceId: workspace.id, limit: 1000 });
  const workspaceMember =
    !isLoading && !isError ? (workspaceMembers || []).find((member) => member.user_id === Number(userId)) : null;
  const isOwner = workspaceMember?.role === "owner";
  const isEditor = isOwner || workspaceMember?.role === "editor";

  const [showWelcome, setShowWelcome] = useLocalStorage("show-welcome", true);
  const hasMounted = useHasMounted();
  const { session } = useSession(true);
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
      <WorkspaceLayout workspaceId={workspace.id}>
        <div className="px-4 py-8 lg:px-16 lg:py-12">
          <WorkspaceHeader workspace={workspace}>
            <Button
              variant="outline"
              className="my-auto gap-2 items-center shrink-0"
              onClick={() => {
                router.push(`/workspaces/${workspace.id}/settings#load-wizard`);
              }}
            >
              Add repositories
            </Button>
          </WorkspaceHeader>
          <div className="grid gap-4 pt-3 border-b sm:flex">
            <WorkspacesTabList workspaceId={workspace.id} selectedTab={"repositories"} />
            <div className="flex items-center justify-end gap-4 flex-wrap w-full mb-2">
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
                  <Repositories
                    repositories={repoIds}
                    personalWorkspaceId={isOwner ? undefined : (session as DbUser)?.personal_workspace_id}
                    showSearch={false}
                  />
                </>
              ) : (
                <Card className="bg-transparent">
                  <EmptyState
                    onAddRepos={() => {
                      router.push(`/workspaces/${workspace.id}/settings#load-wizard`);
                    }}
                  />
                </Card>
              )}
            </ClientOnly>
          </div>
        </div>
      </WorkspaceLayout>
      <ClientOnly>
        <StarSearchEmbed
          userId={userId}
          isEditor={isEditor}
          bearerToken={sessionToken}
          suggestions={WORKSPACE_STARSEARCH_SUGGESTIONS}
          isMobile={isMobile}
          // TODO: implement once we have shared chats in workspaces
          sharedChatId={null}
          tagline="Ask anything about your workspace"
          workspaceId={workspace.id}
          signInHandler={() => signIn({ provider: "github", options: { redirectTo: window.location.href } })}
        />
        <WorkspaceWelcomeModal
          isOpen={showWelcome!}
          onClose={() => {
            setShowWelcome(false);
          }}
        />
      </ClientOnly>
    </>
  );
};

export default WorkspaceDashboard;
