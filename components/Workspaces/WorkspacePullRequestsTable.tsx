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
import clsx from "clsx";
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
      return <GitMergeIcon size={24} aria-label="merged pull request" className="text-purple-600" />;
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
        <span className="sr-only">{`Sort ${name} in ${isAscending ? "ascending" : "descending"} order`}</span>
        {isAscending ? (
          <BiSolidUpArrow className="w-6 aspect-square" />
        ) : (
          <BiSolidDownArrow className="w-6 aspect-square" />
        )}
      </button>
    </div>
  );
}

const PrStateAuthorIcon = ({
  state,
  isDraft,
  isMerged,
  author,
}: {
  state: string;
  isDraft: boolean;
  isMerged: boolean;
  author: string;
}) => {
  return (
    <div className="relative">
      <AvatarHoverCard contributor={author} repositories={[]} size="medium" />
      <div className="absolute bottom-0 right-0">{getPullRequestStateIcon(state, isDraft, isMerged)}</div>
    </div>
  );
};

const pullRequestTableColumnHelper = createColumnHelper<DbRepoPREvents>();
const columns = [
  pullRequestTableColumnHelper.accessor("repo_name", {
    header: "Repository",
    cell: (info) => (
      <Link href={getRepoUrl(info.getValue())} className="text-orange-700 underline hover:no-underline">
        {info.getValue()}
      </Link>
    ),
    size: 120,
  }),
  pullRequestTableColumnHelper.accessor("pr_number", {
    header: "PR #",
    cell: (info) => (
      <Link
        href={getPullRequestUrl(info.row.original.pr_number, info.row.original.repo_name)}
        className="text-orange-700 underline hover:no-underline"
        aria-label={`View pull request #${info.row.original.pr_number} for the repository ${info.row.original.repo_name} repository`}
      >
        {info.row.original.pr_number}
      </Link>
    ),
    size: 100,
  }),
  pullRequestTableColumnHelper.accessor("pr_state", {
    cell: (info) => (
      <PrStateAuthorIcon
        state={info.row.original.pr_state}
        isDraft={info.row.original.pr_is_draft}
        isMerged={info.row.original.pr_is_merged}
        author={info.row.original.pr_author_login}
      />
    ),
    header: "State",
    size: 70,
  }),
  pullRequestTableColumnHelper.accessor("pr_updated_at", {
    header: (info) => <SortedColumn name="Updated At" columnInfo={info} />,
    cell: (info) => getTime(info.getValue()),
    minSize: 130,
  }),
  pullRequestTableColumnHelper.accessor("pr_title", { header: "Title", size: 200 }),
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

const getCommonPinningStyles = (column: Column<DbRepoPREvents>): CSSProperties => {
  const isPinned = column.getIsPinned();
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
    left: ["pr_state", "pr_number", "repo_name", "pr_author_login"],
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
                <TableHead
                  key={header.id}
                  style={{ ...getCommonPinningStyles(header.column) }}
                  className={clsx(header.column.getIsPinned(), "bg-light-slate-3")}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ ...getCommonPinningStyles(cell.column) }}
                  className={clsx(cell.column.getIsPinned(), "bg-white")}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
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
