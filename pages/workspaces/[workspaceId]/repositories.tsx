import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
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
import { deleteCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/workspace-utils";
import Button from "components/atoms/Button/button";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const supabase = createPagesServerClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const bearerToken = session ? session.access_token : "";
  const workspaceId = context.params?.workspaceId as string;
  const { data, error } = await fetchApiData<Workspace>({
    path: `workspaces/${workspaceId}`,
    bearerToken,
    pathValidator: () => true,
  });

  if (error) {
    deleteCookie(context.res, WORKSPACE_ID_COOKIE_NAME);

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  return { props: { workspace: data } };
};

interface WorkspaceDashboardProps {
  workspace: Workspace;
}

const WorkspaceDashboard = ({ workspace }: WorkspaceDashboardProps) => {
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const { data, error: hasError } = useGetWorkspaceRepositories({ workspaceId: workspace.id, range });

  const repositories = data?.data?.map((repo) => repo.repo_id) || [];
  const { data: stats, isError: isStatsError, isLoading: isLoadingStats } = useWorkspacesRepoStats(workspace.id, range);

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <WorkspaceHeader workspace={workspace} />
      <div className="grid sm:flex gap-4 pt-3">
        <WorkspacesTabList workspaceId={workspace.id} selectedTab={"repositories"} />
        <div className="flex justify-end items-center gap-4">
          <Button variant="outline" onClick={() => router.push(`/workspaces/${workspace.id}/settings#load-wizard`)}>
            Add repositories
          </Button>
          <DayRangePicker />
        </div>
      </div>
      <div className="mt-6 grid gap-6">
        <ClientOnly>
          {repositories.length > 0 ? (
            <>
              <div className="flex flex-col lg:flex-row gap-6">
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
              <Repositories repositories={repositories} showSearch={false} />
            </>
          ) : (
            <Card className="bg-transparent">
              <EmptyState onAddRepos={() => router.push(`/workspaces/${workspace.id}/settings#load-wizard`)} />
            </Card>
          )}
        </ClientOnly>
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
