import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState } from "react";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { DayRangePicker } from "components/shared/DayRangePicker";
import { LimitPicker } from "components/shared/LimitPicker";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { setQueryParams } from "lib/utils/query-params";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import WorkspaceBanner from "components/Workspaces/WorkspaceBanner";
import { OrderIssuesBy, useGetWorkspaceIssues } from "lib/hooks/api/useGetWorkspaceIssues";
import { WorkspaceIssueTable } from "components/Workspaces/WorkspaceIssuesTable";
import TabsList from "components/TabList/tab-list";

const InsightUpgradeModal = dynamic(() => import("components/Workspaces/InsightUpgradeModal"));

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

  return { props: { workspace: data, overLimit: !!data?.exceeds_upgrade_limits, isOwner } };
};

interface WorkspaceDashboardProps {
  workspace: Workspace;
  isOwner: boolean;
  overLimit: boolean;
}

type OrderDirection = "ASC" | "DESC";

const WorkspaceIssuesPage = ({ workspace, isOwner, overLimit }: WorkspaceDashboardProps) => {
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
    data: issues,
    isError,
    isLoading,
  } = useGetWorkspaceIssues({
    workspaceId: workspace.id,
    page: Number(page),
    limit: Number(limit),
    orderDirection: orderDirection as OrderDirection,
    orderBy: orderBy as OrderIssuesBy,
    range,
    repoIds,
  });

  const showBanner = isOwner && overLimit;
  const [isInsightUpgradeModalOpen, setIsInsightUpgradeModalOpen] = useState(false);

  return (
    <>
      <WorkspaceLayout
        workspaceId={workspace.id}
        banner={
          showBanner ? (
            <WorkspaceBanner workspaceId={workspace.id} openModal={() => setIsInsightUpgradeModalOpen(true)} />
          ) : null
        }
      >
        <WorkspaceHeader workspace={workspace} />
        <div className="grid sm:flex gap-4 pt-3">
          <WorkspacesTabList workspaceId={workspace.id} selectedTab={"activity"} />
        </div>
        <div className="grid sm:flex gap-4 pt-3">
          <TabsList
            tabList={[
              { name: "Pull Requests", path: "activity" },
              { name: "Issues", path: "issues" },
            ]}
            selectedTab={"issues"}
            pageId={`/workspaces/${workspace.id}`}
          />
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
          <ClientOnly>
            <WorkspaceIssueTable isLoading={isLoading} data={issues} meta={meta} />
          </ClientOnly>
        </div>
        <InsightUpgradeModal
          workspaceId={workspace.id}
          variant="contributors"
          isOpen={isInsightUpgradeModalOpen}
          onClose={() => setIsInsightUpgradeModalOpen(false)}
          overLimit={10}
        />
      </WorkspaceLayout>
    </>
  );
};

export default WorkspaceIssuesPage;
