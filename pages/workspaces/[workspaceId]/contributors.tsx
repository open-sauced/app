import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { SquareFillIcon } from "@primer/octicons-react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { useGetWorkspaceContributors } from "lib/hooks/api/useGetWorkspaceContributors";

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

export default function WorkspaceContributors({ workspace }: WorkspaceDashboardProps) {
  const router = useRouter();
  const range = router.query.range ? Number(router.query.range as string) : 30;
  const { data, error, mutate, isLoading } = useGetWorkspaceContributors({ workspaceId: workspace.id });

  return (
    <WorkspaceLayout workspaceId={workspace.id}>
      <h1 className="flex gap-2 items-center uppercase text-3xl font-semibold">
        {/* putting a square icon here as a placeholder until we implement workspace logos */}
        <SquareFillIcon className="w-12 h-12 text-sauced-orange" />
        <span>{workspace.name}</span>
      </h1>
      <div className="flex justify-between items-center">
        <WorkspacesTabList workspaceId={workspace.id} selectedTab={"contributors"} />
        <div>
          <DayRangePicker />
        </div>
      </div>
    </WorkspaceLayout>
  );
}
