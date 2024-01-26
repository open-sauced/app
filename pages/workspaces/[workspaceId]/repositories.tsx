import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { SquareFillIcon } from "@primer/octicons-react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import TabsList from "components/TabList/tab-list";

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
  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <TabsList tabList={tabList} selectedTab={"repositories"} pageId={`/workspaces/${workspace.id}`} />
    </WorkspaceLayout>
  );
};

export default WorkspaceDashboard;
