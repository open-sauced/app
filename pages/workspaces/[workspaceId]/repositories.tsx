import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import TabsList from "components/TabList/tab-list";
import Repositories from "components/organisms/Repositories/repositories";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";

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

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <TabsList tabList={tabList} selectedTab={"repositories"} pageId={`/workspaces/${workspace.id}`} />
      <div className="mt-6">
        <Repositories repositories={repositories} />
        {/* <RepositoriesTable
        user="asdf"
        listOfRepositories={repositories}
        selectedRepos={selectedRepos}
        handleOnSelectRepo={() => {}}
        loading={loading}
        error={hasError}
      /> */}
      </div>
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
