import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import Repositories from "components/organisms/Repositories/repositories";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { useWorkspacesRepoStats } from "lib/hooks/api/useWorkspacesRepoStats";

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
    if (error.status === 404) {
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
  const { data, error: hasError, mutate: mutateTrackedRepos } = useGetWorkspaceRepositories(workspace.id);

  const repositories = data?.data?.map((repo) => repo.repo_id) || [];
  const { data: stats, isError: isStatsError, isLoading: isLoadingStats } = useWorkspacesRepoStats(workspace.id);
  const { pull_requests, issues, repos } = stats.data;

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <WorkspacesTabList workspaceId={workspace.id} selectedTab={"repositories"} />
      <div className="mt-6 grid gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <RepositoryStatCard type="pulls" stats={pull_requests} isLoading={isLoadingStats} />
          <RepositoryStatCard type="issues" stats={issues} isLoading={isLoadingStats} />
          <RepositoryStatCard type="engagement" stats={repos} isLoading={isLoadingStats} />
        </div>
        <Repositories repositories={repositories} showSearch={false} />
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
