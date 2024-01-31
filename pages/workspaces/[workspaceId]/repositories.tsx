import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa6";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import Repositories from "components/organisms/Repositories/repositories";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { useWorkspacesRepoStats } from "lib/hooks/api/useWorkspacesRepoStats";
import { DayRangePicker } from "components/shared/DayRangePicker";
import Card from "components/atoms/Card/card";
import Button from "components/atoms/Button/button";

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
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const { data, error: hasError } = useGetWorkspaceRepositories({ workspaceId: workspace.id, range });

  const repositories = data?.data?.map((repo) => repo.repo_id) || [];
  const { data: stats, isError: isStatsError, isLoading: isLoadingStats } = useWorkspacesRepoStats(workspace.id, range);

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <div className="flex justify-between items-center">
        <WorkspacesTabList workspaceId={workspace.id} selectedTab={"repositories"} />
        <div>
          <DayRangePicker />
        </div>
      </div>
      <div className="mt-6 grid gap-6">
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
          <Card className="p-6 h-96 grid gap-6 place-content-center bg-transparent">
            <p>You haven&apos;t tracked any repositories</p>
            <Button
              variant="primary"
              className="w-max mx-auto"
              onClick={() => {
                router.push(`/workspaces/${workspace.id}/settings#load-wizard`);
              }}
            >
              <FaPlus className="mr-2 text-lg" />
              Add repositories
            </Button>
          </Card>
        )}
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
