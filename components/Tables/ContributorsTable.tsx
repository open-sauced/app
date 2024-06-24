import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";

type ContributorsTableProps = {
  contributors: DbPRContributor[];
  isLoading: boolean;
  error: Error | undefined;
};

export default function ContributorsTable({ contributors, isLoading, error }: ContributorsTableProps) {
  const contributorsColumnHelper = createColumnHelper<DbPRContributor>();
  const defaultColumns = [
    contributorsColumnHelper.accessor("author_login", {
      header: "Name",
      cell: (info) => (
        <>
          <Link href={`/u/${info.row.original.author_login}`}>{info.row.original.author_login}</Link>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: contributors,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                <p>{header.column.columnDef.header?.toString()}</p>
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
