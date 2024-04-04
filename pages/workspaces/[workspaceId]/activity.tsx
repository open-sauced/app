import dynamic from "next/dynamic";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { CSSProperties, useEffect, useState } from "react";
import {
  Column,
  ColumnPinningState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { WorkspaceLayout } from "components/Workspaces/WorkspaceLayout";
import { fetchApiData } from "helpers/fetchApiData";
import { WorkspacesTabList } from "components/Workspaces/WorkspacesTabList";
import { deleteCookie, setCookie } from "lib/utils/server/cookies";
import { WORKSPACE_ID_COOKIE_NAME } from "lib/utils/caching";
import { WorkspaceHeader } from "components/Workspaces/WorkspaceHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import usePullRequests from "lib/hooks/api/usePullRequests";
import { useGetWorkspaceRepositories } from "lib/hooks/api/useGetWorkspaceRepositories";
import { DayRangePicker } from "components/shared/DayRangePicker";
import TrackedRepositoryFilter from "components/Workspaces/TrackedRepositoryFilter";
import { OptionKeys } from "components/atoms/Select/multi-select";
import { OrderDirection, OrderDirectionPicker } from "components/shared/OrderDirectionPicker";
import { OrderByPicker } from "components/shared/OrderByPicker";

interface PullRequestTableProps {
  data: DbRepoPREvents[];
}

const pullRequestTableColumnHelper = createColumnHelper<DbRepoPREvents>();
const columns = [
  pullRequestTableColumnHelper.accessor("pr_state", { header: "State" }),
  pullRequestTableColumnHelper.accessor("pr_author_login", { header: "Author" }),
  pullRequestTableColumnHelper.accessor("pr_updated_at", { header: "Updated At" }),
  pullRequestTableColumnHelper.accessor("pr_title", { header: "Title" }),
  pullRequestTableColumnHelper.accessor("pr_changed_files", { header: "Changed Files" }),
  pullRequestTableColumnHelper.accessor("pr_additions", { header: "Additions" }),
  pullRequestTableColumnHelper.accessor("pr_deletions", { header: "Deletions" }),
  pullRequestTableColumnHelper.accessor("pr_number", { header: "Number" }),
  pullRequestTableColumnHelper.accessor("repo_name", { header: "Repository" }),
  pullRequestTableColumnHelper.accessor("pr_created_at", { header: "Created At" }),
  pullRequestTableColumnHelper.accessor("pr_closed_at", { header: "Closed At" }),
  pullRequestTableColumnHelper.accessor("pr_merged_at", { header: "Merged At" }),
];
//These are the important styles to make sticky column pinning work!
//Apply styles like this using your CSS strategy of choice with this kind of logic to head cells, data cells, footer cells, etc.
//View the index.css file for more needed styles such as border-collapse: separate
const getCommonPinningStyles = (column: Column<DbRepoPREvents>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right");

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

const PullRequestTable = ({ data }: PullRequestTableProps) => {
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["pr_author_login", "pr_updated_at"],
  });
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning,
    },
  });

  return (
    <>
      <Table className="border rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-light-slate-3">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-white" style={{ ...getCommonPinningStyles(header.column) }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`${cell.column.getIsPinned() ? "bg-white" : "bg-purple"}`}
                  style={{ ...getCommonPinningStyles(cell.column) }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ClientOnly>
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
      </ClientOnly> */}
    </>
  );
};
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

// type according to allowed API payload values
const orderByOptions = [
  { label: "Created At", value: "created_at" },
  { label: "Updated At", value: "updated_at" },
  { label: "Closed At", value: "closed_at" },
  { label: "Merged At", value: "merged_at" },
];

const WorkspaceActivityPage = ({ workspace }: WorkspaceDashboardProps) => {
  const router = useRouter();
  const {
    limit = 10,
    range = 30,
    page = 1,
    orderDirection = "",
    orderBy = "",
  } = router.query as { limit: string; range: string; page: string; orderDirection: OrderDirection; orderBy: string };
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
  } = usePullRequests(Number(limit), repoIds, Number(range), Number(page), orderDirection, orderBy);

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
            <OrderByPicker options={orderByOptions} defaultValue="created_at" />
            <OrderDirectionPicker defaultValue="ASC" />
            <TrackedRepositoryFilter
              options={filterOptions}
              handleSelect={(selected: OptionKeys[]) => setFilteredRepositories(selected)}
            />
          </div>
          <PullRequestTable data={pullRequests} />
        </div>
      </WorkspaceLayout>
    </>
  );
};

export default WorkspaceActivityPage;
