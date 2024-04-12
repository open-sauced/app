import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { OrderPullRequestsBy, useWorkspacePullRequests } from "lib/hooks/api/useWorkspacePullRequests";
import { WorkspacePullRequestTable } from "components/Workspaces/WorkspacePullRequestsTable";
import { LimitPicker } from "components/shared/LimitPicker";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { setQueryParams } from "lib/utils/query-params";

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
    deleteCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME });

    if (error.status === 404 || error.status === 401) {
      return { notFound: true };
    }

    throw new Error(`Error loading workspaces page with ID ${workspaceId}`);
  }

  setCookie({ response: context.res, name: WORKSPACE_ID_COOKIE_NAME, value: workspaceId });

  return { props: { workspace: data } };
};

interface WorkspaceDashboardProps {
  workspace: Workspace;
}

type OrderDirection = "ASC" | "DESC";

const WorkspaceActivityPage = ({ workspace }: WorkspaceDashboardProps) => {
  const router = useRouter();
  const {
    limit = 10,
    range: rawRange = 30,
    page = 1,
    orderDirection = "",
    orderBy = "",
  } = router.query as { limit: string; range: string; page: string; orderDirection: OrderDirection; orderBy: string };
  const range = Number(rawRange);
  const { data: repositories, error: hasError } = useGetWorkspaceRepositories({ workspaceId: workspace.id, range });
  const [filteredRepositories, setFilteredRepositories] = useState<OptionKeys[]>([]);
  const filterOptions = repositories
    ? Array.from(repositories?.data!, (repo) => {
        return { label: repo.repo.full_name, value: `${repo.repo_id}` };
      })
    : [];
  const repoIds = filteredRepositories.map((option) => Number(option.value));
  const {
    meta,
    data: pullRequests,
    isError,
    isLoading,
  } = useWorkspacePullRequests({
    workspaceId: workspace.id,
    page: Number(page),
    limit: Number(limit),
    orderDirection: orderDirection as OrderDirection,
    orderBy: orderBy as OrderPullRequestsBy,
    range,
    repoIds,
  });

  return (
    <>
      <WorkspaceLayout workspaceId={workspace.id}>
        <WorkspaceHeader workspace={workspace} />
        <div className="grid sm:flex gap-4 pt-3">
          <WorkspacesTabList workspaceId={workspace.id} selectedTab={"activity"} />
        </div>
        <div className="mt-6 grid gap-6">
          <div className="flex justify-end items-center gap-4">
            <TrackedRepositoryFilter
              options={filterOptions}
              handleSelect={(selected: OptionKeys[]) => {
                setFilteredRepositories(selected);
                setQueryParams({ page: "1" });
              }}
            />
            <DayRangePicker />
            <LimitPicker />
          </div>
          <WorkspacePullRequestTable isLoading={isLoading} data={pullRequests} meta={meta} />
        </div>
      </WorkspaceLayout>
    </>
  );
};

export default WorkspaceActivityPage;
