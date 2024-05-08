import {
  Column,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { CSSProperties, useMemo, useState } from "react";

import Link from "next/link";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import clsx from "clsx";
import Skeleton from "react-loading-skeleton";
import { HeartFillIcon } from "@primer/octicons-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import Pagination from "components/molecules/Pagination/pagination";
import "@github/relative-time-element";
import { setQueryParams } from "lib/utils/query-params";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { IssueStateAuthorIcon } from "components/Issues/IssueStateAuthorIcon";

interface WorkspaceIssueTableProps {
  data: DbRepoIssueEvents[] | null;
  meta: Meta | null;
  isLoading: boolean;
}

function getIssueUrl(prNumber: number, repoName: string) {
  return `https://github.com/${repoName}/issues/${prNumber}`;
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

const issueTableColumnHelper = createColumnHelper<DbRepoIssueEvents>();
const columns = [
  issueTableColumnHelper.accessor("issue_number", {
    header: "Issue",
    cell: (info) => (
      <div className="flex flex-col gap-2">
        <div>{info.row.original.issue_title}</div>
        <Link href={getRepoUrl(info.row.original.repo_name)} className="text-orange-700 underline hover:no-underline">
          {info.row.original.repo_name}
        </Link>
        <Link
          href={getIssueUrl(info.row.original.issue_number, info.row.original.repo_name)}
          target="_blank"
          rel="noopener"
          className="text-orange-700 underline hover:no-underline"
          aria-label={`View issue #${info.row.original.issue_number} for the repository ${info.row.original.repo_name} repository`}
        >
          #{info.row.original.issue_number}
        </Link>
      </div>
    ),
    size: 300,
  }),
  issueTableColumnHelper.accessor("issue_state", {
    cell: (info) => (
      <IssueStateAuthorIcon
        state={info.row.original.issue_state}
        author={info.row.original.issue_author_login.replace("[bot]", "")}
      />
    ),
    header: "State",
    size: 60,
  }),
  issueTableColumnHelper.accessor("issue_updated_at", {
    header: "Updated At",
    cell: (info) => getTime(info.getValue()),
    enableSorting: true,
  }),
  issueTableColumnHelper.accessor("issue_created_at", {
    header: "Created At",
    cell: (info) => getTime(info.getValue()),
    enableSorting: true,
  }),
  issueTableColumnHelper.accessor("issue_closed_at", {
    header: "Closed At",
    cell: (info) => (info.row.original.issue_state === "closed" ? getTime(info.getValue()) : "-"),
    enableSorting: true,
  }),

  issueTableColumnHelper.accessor("issue_reactions_heart", {
    header: (_info) => <HeartFillIcon size={16} className="text-red-500" />,
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
];

const mobileColumns = [
  issueTableColumnHelper.accessor("issue_number", {
    header: "Issues",
    cell: (info) => {
      const author = info.row.original.issue_author_login.replace("[bot]", "");

      return (
        <div className="flex gap-4">
          <div>
            <IssueStateAuthorIcon
              state={info.row.original.issue_state}
              author={info.row.original.issue_author_login.replace("[bot]", "")}
            />
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="text-base">{info.row.original.issue_title}</div>
            <Link
              href={getRepoUrl(info.row.original.repo_name)}
              className="text-orange-700 underline hover:no-underline"
            >
              {info.row.original.repo_name}
            </Link>
            <p>
              <Link
                href={getIssueUrl(info.row.original.issue_number, info.row.original.repo_name)}
                target="_blank"
                rel="noopener"
                className="text-orange-700 underline hover:no-underline"
                aria-label={`View issue #${info.row.original.issue_number} for the repository ${info.row.original.repo_name} repository`}
              >
                #{info.row.original.issue_number}
              </Link>{" "}
              <span>opened</span> <relative-time datetime={info.row.original.issue_created_at}></relative-time> by{" "}
              <Link
                href={`/user/${author}`}
                title={`User profile for ${author}`}
                className="text-orange-700 underline hover:no-underline"
                aria-hidden="true"
              >
                {author}
              </Link>
              {/* add the updated at field */}
            </p>
            <span>
              {info.row.original.issue_state === "closed" ? (
                <>
                  Closed <relative-time datetime={info.row.original.issue_closed_at}></relative-time>
                </>
              ) : (
                <>
                  Updated <relative-time datetime={info.row.original.issue_updated_at}></relative-time>
                </>
              )}
            </span>
          </div>
        </div>
      );
    },
  }),
];

const getCommonPinningStyles = (column: Column<DbRepoIssueEvents>): CSSProperties => {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const WorkspaceIssueTable = ({ data, meta, isLoading }: WorkspaceIssueTableProps) => {
  const [sorting, setSorting] = useState<TableState["sorting"]>([
    { id: "issue_updated_at", desc: false },
    { id: "issue_created_at", desc: false },
    { id: "issue_closed_at", desc: false },
    { id: "issue_merged_at", desc: false },
  ]);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const skeletonHeight = isMobile ? 150 : 100;

  const table = useReactTable({
    columns: useMemo(() => (isMobile ? mobileColumns : columns), [isMobile]),
    data: isLoading ? new Array(10).fill({}) : data || [],
    // we're manually sorting and paging becuase the API handles the sorting server-side.
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: {
        left: ["issue_state", "issue_number"],
      },
      sorting,
    },
  });

  return (
    <>
      <Table className="border rounded-lg text-base">
        <caption className="sr-only">Issues</caption>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-light-slate-3">
              {headerGroup.headers.map((header) => {
                const { enableSorting } = header.column.columnDef;
                const isAscending = Boolean(sorting.find((item) => item.id === header.id && !item.desc));

                return (
                  <TableHead
                    key={header.id}
                    style={{ ...getCommonPinningStyles(header.column), width: header.column.getSize() }}
                    className={clsx(header.column.getIsPinned(), "bg-light-slate-3")}
                  >
                    <div className="flex items-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {enableSorting ? (
                        <button
                          onClick={(event) => {
                            setQueryParams({
                              orderBy: header.id.replace("issue_", ""),
                              orderDirection: isAscending ? "DESC" : "ASC",
                            });

                            setSorting((currentState) => {
                              const state = currentState
                                .filter((item) => item.id !== header.id)
                                .map(({ id }) => ({ id, desc: false }));

                              return [
                                ...state,
                                {
                                  id: header.id,
                                  // If it was ascending, we want to set it to descending
                                  desc: isAscending,
                                },
                              ];
                            });
                          }}
                        >
                          <span className="sr-only">{`Sort ${header.column.columnDef.header} in ${
                            isAscending ? "ascending" : "descending"
                          } order`}</span>
                          {isAscending ? (
                            <BiSolidUpArrow className="w-6 aspect-square" />
                          ) : (
                            <BiSolidDownArrow className="w-6 aspect-square" />
                          )}
                        </button>
                      ) : null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {isLoading ? (
                <TableCell colSpan={row.getVisibleCells().length}>
                  <Skeleton count={1} height={skeletonHeight} />
                </TableCell>
              ) : (
                <>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ ...getCommonPinningStyles(cell.column), width: cell.column.getSize() }}
                      className={clsx(cell.column.getIsPinned(), "bg-white")}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {meta ? (
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
      ) : null}
    </>
  );
};
