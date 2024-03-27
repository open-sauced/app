import dynamic from "next/dynamic";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PullRequestRow } from "components/PullRequests/PullRequestRow";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "components/shared/Table";
import usePullRequests from "lib/hooks/api/usePullRequests";
import Pagination from "components/molecules/Pagination/pagination";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { DayRangePicker } from "components/shared/DayRangePicker";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";

const WorkspaceWelcomeModal = dynamic(() => import("components/Workspaces/WorkspaceWelcomeModal"));

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

const WorkspaceActivityPage = ({ workspace }: WorkspaceDashboardProps) => {
  const router = useRouter();
  const { limit = 10, range = 30, page = 1 } = router.query as { limit: string; range: string; page: string };
  const { data: repositories, error: hasRepoErrors } = useGetWorkspaceRepositories({
    workspaceId: workspace.id,
    range: Number(range),
  });
  const [repoIds, setRepoIds] = useState(repositories?.data?.map((repo) => repo.repo_id) || []);
  const [filteredRepositories, setFilteredRepositories] = useState<OptionKeys[]>([]);
  const filterOptions = repositories
    ? Array.from(repositories?.data!, (repo) => {
        return { label: repo.repo.full_name, value: `${repo.repo_id}` };
      })
    : [];

  useEffect(() => {
    setRepoIds(
      filteredRepositories.length > 0
        ? filteredRepositories.map((repo) => Number.parseInt(repo.value))
        : repositories?.data?.map((repo) => repo.repo_id) || []
    );
  }, [repositories, filteredRepositories]);

  const {
    meta,
    data: pullRequests,
    isError,
    isLoading,
  } = usePullRequests(Number(limit), repoIds, Number(range), Number(page));

  return (
    <>
      {/* TODO: Workspace Activity OG image? */}
      <WorkspaceLayout workspaceId={workspace.id}>
        <WorkspaceHeader workspace={workspace} />
        <div className="grid sm:flex gap-4 pt-3">
          <WorkspacesTabList workspaceId={workspace.id} selectedTab={"activity"} />
        </div>
        <div className="mt-6 grid gap-6">
          <div className="flex justify-end items-center gap-4">
            <DayRangePicker />
            <TrackedRepositoryFilter
              options={filterOptions}
              handleSelect={(selected: OptionKeys[]) => setFilteredRepositories(selected)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>PR #</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Repository</TableHead>
                <TableHead># of Comments</TableHead>
                <TableHead>Additions</TableHead>
                <TableHead>Deletions</TableHead>
                <TableHead>Changed Files</TableHead>
                <TableHead>Commits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* TODO: Loading state */}
              <ClientOnly>
                {pullRequests.map((pullRequest) => (
                  <PullRequestRow key={pullRequest.event_id} repoId={1} pullRequest={pullRequest} />
                ))}
              </ClientOnly>
            </TableBody>
          </Table>
          <ClientOnly>
            <Pagination
              pages={[]}
              onPageChange={(page) => {
                router.push({
                  query: { ...router.query, page },
                });
              }}
              totalPage={meta.pageCount}
              page={meta.page}
              showTotalPages={true}
              goToPage={true}
            />
          </ClientOnly>
        </div>
      </WorkspaceLayout>
    </>
  );
};

export default WorkspaceActivityPage;
