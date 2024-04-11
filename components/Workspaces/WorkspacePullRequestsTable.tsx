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

import Link from "next/link";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import clsx from "clsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import Pagination from "components/molecules/Pagination/pagination";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import "@github/relative-time-element";
import { PrStateAuthorIcon } from "components/PullRequests/PrStateAuthorIcon";
import { setQueryParams } from "lib/utils/query-params";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

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
      <relative-time datetime={utcTime}></relative-time>
    </div>
  );
}

function SortedColumn({ name, columnInfo }: { name: string; columnInfo: HeaderContext<DbRepoPREvents, string> }) {
  const [isAscending, setIsAscending] = useState(true);
  return (
    <div className="flex gap-2 items-center">
      <span>{name}</span>
      <button
        onClick={() => {
          setIsAscending(!isAscending);
          setQueryParams({
            orderBy: columnInfo.column.id.replace("pr_", ""),
            orderDirection: isAscending ? "DESC" : "ASC",
          });
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

const pullRequestTableColumnHelper = createColumnHelper<DbRepoPREvents>();
const columns = [
  pullRequestTableColumnHelper.accessor("pr_number", {
    header: "Pull Request",
    cell: (info) => (
      <div className="flex flex-col gap-2">
        <div>{info.row.original.pr_title}</div>
        <Link href={getRepoUrl(info.row.original.repo_name)} className="text-orange-700 underline hover:no-underline">
          {info.row.original.repo_name}
        </Link>
        <Link
          href={getPullRequestUrl(info.row.original.pr_number, info.row.original.repo_name)}
          className="text-orange-700 underline hover:no-underline"
          aria-label={`View pull request #${info.row.original.pr_number} for the repository ${info.row.original.repo_name} repository`}
        >
          #{info.row.original.pr_number}
        </Link>
      </div>
    ),
    size: 300,
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
    size: 60,
  }),
  pullRequestTableColumnHelper.accessor("pr_changed_files", { header: "Changed Files" }),
  pullRequestTableColumnHelper.accessor("pr_additions", {
    header: "Changes",
    cell: (info) => (
      <span className="flex gap-1">
        <span className="text-green-800 before:content-['+']">{info.row.original.pr_additions}</span>
        <span className="text-red-800 before:content-['-']">{info.row.original.pr_deletions}</span>
      </span>
    ),
  }),
  pullRequestTableColumnHelper.accessor("pr_updated_at", {
    header: (info) => <SortedColumn name="Updated At" columnInfo={info} />,
    cell: (info) => getTime(info.getValue()),
  }),
  pullRequestTableColumnHelper.accessor("pr_created_at", {
    header: (info) => <SortedColumn name="Created At" columnInfo={info} />,
    cell: (info) => getTime(info.getValue()),
  }),
  pullRequestTableColumnHelper.accessor("pr_closed_at", {
    header: (info) => <SortedColumn name="Closed At" columnInfo={info} />,
    cell: (info) => (info.row.original.pr_state === "closed" ? getTime(info.getValue()) : "-"),
  }),
  pullRequestTableColumnHelper.accessor("pr_merged_at", {
    header: (info) => <SortedColumn name="Merged At" columnInfo={info} />,
    cell: (info) => (info.row.original.pr_is_merged ? getTime(info.getValue()) : "-"),
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
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: ["pr_state", "pr_number", "repo_name", "pr_author_login"],
  });
  const table = useReactTable({
    columns,
    data,
    // we're manually sorting and paging becuase the API handles the sorting server-side.
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning,
    },
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Table className="border rounded-lg">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-light-slate-3">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ ...getCommonPinningStyles(header.column), width: header.column.getSize() }}
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
                  style={{ ...getCommonPinningStyles(cell.column), width: cell.column.getSize() }}
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
          showPages={!isMobile}
          showTotalPages={true}
          onPageChange={(page) => {
            setQueryParams({ page: `${page}` });
          }}
          hasNextPage={meta.hasNextPage}
          hasPreviousPage={meta.hasPreviousPage}
          totalPage={meta.pageCount}
          page={meta.page}
          goToPage={true}
        />
      </ClientOnly>
    </>
  );
};
