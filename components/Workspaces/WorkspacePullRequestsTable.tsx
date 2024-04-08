import {
  Column,
  ColumnPinningState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  HeaderContext,
  useReactTable,
} from "@tanstack/react-table";
import { CSSProperties, useState } from "react";
import { GitMergeIcon, GitPullRequestClosedIcon, GitPullRequestIcon } from "@primer/octicons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import AvatarHoverCard from "components/atoms/Avatar/avatar-hover-card";
import Pagination from "components/molecules/Pagination/pagination";
import ClientOnly from "components/atoms/ClientOnly/client-only";

interface PullRequestTableProps {
  data: DbRepoPREvents[];
  meta: Meta;
}

function getPullRequestUrl(prNumber: number, repoName: string) {
  return `https://github.com/${repoName}/pull/${prNumber}`;
}

function getRepoUrl(repoName: string) {
  return `/s/${repoName}`;
}

function getTime(utcTime: string) {
  return (
    <div className="flex gap-2">
      <time dateTime={utcTime}>{new Date(utcTime).toLocaleDateString()}</time>
    </div>
  );
}

function getPullRequestStateIcon(
  state: DbRepoPREvents["pr_state"],
  isDraft: DbRepoPREvents["pr_is_draft"],
  isMerged: DbRepoPREvents["pr_is_merged"]
) {
  switch (true) {
    case state === "open" && !isDraft:
      return <GitPullRequestIcon aria-label="open pull request" size={24} className="text-green-600" />;
    case state === "open" && isDraft:
      return <GitPullRequestIcon size={24} aria-label="draft pull request" className="text-slate-600" />;
    case state === "closed" && !isMerged:
      return <GitPullRequestClosedIcon size={24} aria-label="closed pull request" className="text-red-600" />;
    case state === "closed" && isMerged:
      return <GitMergeIcon size={24} aria-label="merged pull request" className="text-purple-600 h-8 w-8" />;
  }
}

function SortedColumn({ name, columnInfo }: { name: string; columnInfo: HeaderContext<DbRepoPREvents, string> }) {
  const [isAscending, setIsAscending] = useState(true);
  return (
    <div className="flex gap-2 items-center">
      <span>{name}</span>
      <button
        onClick={() => {
          setIsAscending(!isAscending);
        }}
      >
        {isAscending ? (
          <BiSolidUpArrow className="w-6 aspect-square" />
        ) : (
          <BiSolidDownArrow className="w-6 aspect-square" />
        )}
      </button>
    </div>
  );
}

const pullRequestTableColumnHelper = createColumnHelper<DbRepoPREvents>();
const columns = [
  pullRequestTableColumnHelper.accessor("repo_name", {
    header: (info) => <SortedColumn name="Updated At" columnInfo={info} />,
    cell: (info) => (
      <Link href={getRepoUrl(info.getValue())} className="text-orange-700 underline hover:no-underline">
        {info.getValue()}
      </Link>
    ),
  }),
  pullRequestTableColumnHelper.accessor("pr_number", {
    header: "Number",
    cell: (info) => (
      <Link
        href={getPullRequestUrl(info.row.original.pr_number, info.row.original.repo_name)}
        className="text-orange-700 underline hover:no-underline"
      >
        {info.row.original.pr_number}
      </Link>
    ),
  }),
  pullRequestTableColumnHelper.accessor("pr_state", {
    cell: (info) =>
      getPullRequestStateIcon(
        info.row.original.pr_state,
        info.row.original.pr_is_draft,
        info.row.original.pr_is_merged
      ),
    header: "State",
  }),
  pullRequestTableColumnHelper.accessor("pr_author_login", {
    header: "Author",
    cell: (info) => <AvatarHoverCard contributor={info.row.original.pr_author_login} repositories={[]} size="medium" />,
  }),
  pullRequestTableColumnHelper.accessor("pr_updated_at", {
    header: "Updated At",
    cell: (info) => getTime(info.getValue()),
  }),
  pullRequestTableColumnHelper.accessor("pr_title", { header: "Title" }),
  pullRequestTableColumnHelper.accessor("pr_changed_files", { header: "Changed Files" }),
  pullRequestTableColumnHelper.accessor("pr_additions", {
    header: "Additions",
    cell: (info) => <span className="text-green-800 before:content-['+']">{info.getValue()}</span>,
  }),
  pullRequestTableColumnHelper.accessor("pr_deletions", {
    header: "Deletions",
    cell: (info) => <span className="text-red-800 before:content-['-']">{info.getValue()}</span>,
  }),
  pullRequestTableColumnHelper.accessor("pr_created_at", {
    header: "Created At",
    cell: (info) => getTime(info.getValue()),
  }),
  pullRequestTableColumnHelper.accessor("pr_closed_at", {
    header: "Closed At",
    cell: (info) => getTime(info.getValue()),
  }),
  pullRequestTableColumnHelper.accessor("pr_merged_at", {
    header: "Merged At",
    cell: (info) => getTime(info.getValue()),
  }),
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

export const WorkspacePullRequestTable = ({ data, meta }: PullRequestTableProps) => {
  const router = useRouter();
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["pr_state", "pr_number", "repo_name", "pr_author_login", "pr_updated_at"],
  });
  const table = useReactTable({
    columns,
    data,
    // we're manually sorting becuase the API handles the sorting server-side.
    manualSorting: true,
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
                <TableHead key={header.id}>
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
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
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
    </>
  );
};
