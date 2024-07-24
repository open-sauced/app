import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
  getExpandedRowModel,
  TableState,
} from "@tanstack/react-table";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { OscrPill } from "components/Contributors/OscrPill";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { setQueryParams } from "lib/utils/query-params";
import Pagination from "components/molecules/Pagination/pagination";

type ContributorsTableProps = {
  contributors: DbRepoContributor[] | undefined;
  meta: Meta | null;
  isLoading: boolean;
  isError: boolean;
};

export default function ContributorsTable({ contributors, meta, isLoading, isError }: ContributorsTableProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [sorting, setSorting] = useState<TableState["sorting"]>([{ id: "oscr", desc: true }]);

  const contributorsColumnHelper = createColumnHelper<DbRepoContributor>();
  const defaultColumns = [
    contributorsColumnHelper.accessor("login", {
      header: "Contributor",
      cell: (info) => (
        <div className="w-fit">
          <HoverCard.Root>
            <Link href={`/u/${info.row.original.login}`} className="rounded-full">
              <HoverCard.Trigger className="flex gap-4 items-center">
                <Avatar
                  size={24}
                  className="xl:w-9 xl:h-9"
                  isCircle
                  hasBorder={false}
                  avatarURL={getAvatarByUsername(info.row.original.login)}
                />
                <p>{info.row.original.login}</p>
              </HoverCard.Trigger>
            </Link>
            <HoverCard.Portal>
              <HoverCard.Content sideOffset={5}>
                <HoverCardWrapper username={info.row.original.login} />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
      ),
    }),
    contributorsColumnHelper.accessor("oscr", {
      header: "Rating",
      enableSorting: true,
      enableGlobalFilter: false,
      cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} />,
    }),
    contributorsColumnHelper.accessor("company", {
      header: "Company",
    }),
    contributorsColumnHelper.accessor("location", {
      header: "Location",
    }),
    contributorsColumnHelper.accessor("total_contributions", {
      header: "Contributions",
    }),
  ];

  const mobileColumns = [
    {
      id: "expand",
      header: "",
      cell: ({ row }: { row: Row<DbRepoContributor> }) => {
        return (
          row.getCanExpand() && (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? <BsArrowsCollapse /> : <BsArrowsExpand />}
            </button>
          )
        );
      },
    },
    contributorsColumnHelper.accessor("login", {
      header: "Contributor",
      enableSorting: true,
      cell: (info) => (
        <div className="w-fit">
          <HoverCard.Root>
            <Link href={`/u/${info.row.original.login}`} className="rounded-full">
              <HoverCard.Trigger className="flex gap-4 items-center">
                <Avatar
                  size={24}
                  className="xl:w-9 xl:h-9"
                  isCircle
                  hasBorder={false}
                  avatarURL={info.row.original.avatar_url}
                />
                <p>{info.row.original.login}</p>
              </HoverCard.Trigger>
            </Link>
            <HoverCard.Portal>
              <HoverCard.Content sideOffset={5}>
                <HoverCardWrapper username={info.row.original.login} />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
      ),
    }),
    contributorsColumnHelper.accessor("oscr", {
      header: "Rating",
      enableSorting: true,
      cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} />,
    }),
  ];

  const table = useReactTable({
    columns: useMemo(() => (isMobile ? mobileColumns : defaultColumns), [isMobile]),
    data: contributors ?? [],
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => isMobile,
    getExpandedRowModel: getExpandedRowModel(),
    state: { sorting },
  });

  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <button
                    onClick={() => {
                      const { enableSorting } = header.column.columnDef;
                      const isAscending = Boolean(sorting.find((item) => item.id === header.id && !item.desc));

                      if (enableSorting) {
                        setQueryParams({ orderDirection: isAscending ? "DESC" : "ASC" });
                        setSorting((currentState) => {
                          const state = currentState
                            .filter((item) => item.id !== header.id)
                            .map(({ id }) => ({ id, desc: false }));

                          return [
                            ...state,
                            {
                              id: header.id,
                              desc: isAscending,
                            },
                          ];
                        });
                      }
                    }}
                    className="flex gap-2 w-fit items-center"
                  >
                    <h2 className="font-semibold">{header.column.columnDef.header?.toString()}</h2>
                    {header.column.columnDef.enableSorting &&
                      (Boolean(sorting.find((item) => item.id === header.id && !item.desc)) ? (
                        <FaSortUp />
                      ) : (
                        <FaSortDown />
                      ))}
                  </button>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <>
              <TableRow key={row.id} className={`${row.getIsExpanded() && "border border-orange-500"}`}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
              {row.getIsExpanded() && (
                <div className="flex flex-col gap-2 w-full">
                  <section className="flex w-full justify-between">
                    <h3>Company</h3>
                    <p>{row.original.company}</p>
                  </section>
                </div>
              )}
            </>
          ))}
        </TableBody>
      </Table>

      {meta && (
        <div className="self-end">
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
        </div>
      )}
    </div>
  );
}
