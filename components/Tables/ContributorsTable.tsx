import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { OscrPill } from "components/Contributors/OscrPill";

type ContributorsTableProps = {
  contributors: DbPRContributor[];
  isLoading: boolean;
  error: Error | undefined;
};

export default function ContributorsTable({ contributors, isLoading, error }: ContributorsTableProps) {
  const contributorsColumnHelper = createColumnHelper<DbPRContributor>();
  const defaultColumns = [
    contributorsColumnHelper.accessor("author_login", {
      header: "Contributor",
      sortingFn: "alphanumeric",
      cell: (info) => (
        <div className="w-fit">
          <HoverCard.Root>
            <Link href={`/u/${info.row.original.author_login}`} className="rounded-full">
              <HoverCard.Trigger className="flex gap-4 items-center">
                <Avatar
                  size={24}
                  className="xl:w-9 xl:h-9"
                  isCircle
                  hasBorder={false}
                  avatarURL={getAvatarByUsername(info.row.original.author_login)}
                />
                <p>{info.row.original.author_login}</p>
              </HoverCard.Trigger>
            </Link>
            <HoverCard.Portal>
              <HoverCard.Content sideOffset={5}>
                <HoverCardWrapper username={info.row.original.author_login} />
              </HoverCard.Content>
            </HoverCard.Portal>
          </HoverCard.Root>
        </div>
      ),
    }),
    contributorsColumnHelper.accessor("oscr", {
      header: "Rating",
      sortingFn: "basic",
      cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} />,
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: contributors,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                <button onClick={header.column.getToggleSortingHandler()} className="flex gap-2 w-fit items-center">
                  <h2 className="font-semibold">{header.column.columnDef.header?.toString()}</h2>
                  {header.column.getCanSort() && header.column.getNextSortingOrder() === "asc" ? (
                    <FaSort />
                  ) : header.column.getNextSortingOrder() === "desc" ? (
                    <FaSortUp />
                  ) : (
                    <FaSortDown />
                  )}
                </button>
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
  );
}
