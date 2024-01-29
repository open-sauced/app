import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import TabsList from "components/TabList/tab-list";
import Repositories from "components/organisms/Repositories/repositories";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { RepositoryStatCard } from "components/Workspaces/RepositoryStatCard";

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

const tabList = [{ name: "Repositories" }, { name: "Contributors" }, { name: "Activity" }, { name: "Highlights" }];

const WorkspaceDashboard = ({ workspace }: WorkspaceDashboardProps) => {
  const { data, error: hasError, mutate: mutateTrackedRepos } = useGetWorkspaceRepositories(workspace.id);

  const repositories = data?.data?.map((repo) => repo.repo_id) || [];
  const pullStats = {
    opened: 10,
    merged: 5,
    velocity: 2,
  };
  const issueStats = {
    opened: 10,
    closed: 5,
    velocity: 2,
  };
  const engagementStats = {
    stars: 4530,
    forks: 87,
    health: 7,
  };
  const isLoadingStats = false;

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <TabsList tabList={tabList} selectedTab={"repositories"} pageId={`/workspaces/${workspace.id}`} />
      <div className="mt-6 grid gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <RepositoryStatCard type="pulls" stats={pullStats} isLoading={isLoadingStats} />
          <RepositoryStatCard type="issues" stats={issueStats} isLoading={isLoadingStats} />
          <RepositoryStatCard type="engagement" stats={engagementStats} isLoading={isLoadingStats} />
        </div>
        <Repositories repositories={repositories} showSearch={false} />
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
