import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
  getFilteredRowModel,
  Row,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { useRouter } from "next/router";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { OscrPill } from "components/Contributors/OscrPill";
import Search from "components/atoms/Search/search";
import { useMediaQuery } from "lib/hooks/useMediaQuery";

declare module "@tanstack/react-table" {
  // add fuzzy filter to the filterFns
  // optional
  interface FilterFns {
    fuzzy?: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// TODO: add props for data
export default function ContributorsTable() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  function onSearchContributors(searchTerm?: string) {
    if (searchTerm && searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm(undefined);
    }
  }

  const contributorsColumnHelper = createColumnHelper<DbRepoContributor>();
  const defaultColumns = [
    contributorsColumnHelper.accessor("login", {
      header: "Contributor",
      sortingFn: "alphanumeric",
      filterFn: "includesString",
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
      sortingFn: "basic",
      enableGlobalFilter: false,
      cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} />,
    }),
    contributorsColumnHelper.accessor("company", {
      header: "Company",
      sortingFn: "alphanumeric",
      filterFn: "includesString",
    }),
    contributorsColumnHelper.accessor("location", {
      header: "Location",
      sortingFn: "alphanumeric",
      filterFn: "includesString",
    }),
    contributorsColumnHelper.accessor("total_contributions", {
      header: "Contributions",
      sortingFn: "basic",
      enableGlobalFilter: false,
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
      sortingFn: "alphanumeric",
      filterFn: "includesString",
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
      sortingFn: "basic",
      enableGlobalFilter: false,
      cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} />,
    }),
  ];

  const table = useReactTable({
    columns: useMemo(() => (isMobile ? mobileColumns : defaultColumns), [isMobile]),
    data: fakeData, // TODO: get real data!
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => isMobile,
    getExpandedRowModel: getExpandedRowModel(),
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: "fuzzy",
    onGlobalFilterChange: setSearchTerm,
    state: { globalFilter: searchTerm },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-full lg:justify-end">
        <Search
          name="Search contributors"
          placeholder="Search contributors"
          onSearch={onSearchContributors}
          onChange={onSearchContributors}
          className="w-full max-w-[10rem]"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <button onClick={header.column.getToggleSortingHandler()} className="flex gap-2 w-fit items-center">
                    <h2 className="font-semibold">{header.column.columnDef.header?.toString()}</h2>
                    {header.column.getCanSort() &&
                      (header.column.getNextSortingOrder() === "asc" ? (
                        <FaSort />
                      ) : header.column.getNextSortingOrder() === "desc" ? (
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
    </div>
  );
}

// TODO: REMOVE mock data and utils
const fakeData: DbRepoContributor[] = [
  {
    id: 0,
    login: "zeucapua",
    avatar_url: getAvatarByUsername("zeucapua"),
    oscr: Number(Math.random().toFixed(2)),
    company: "OpenSauced",
    location: "Disneyland",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    commits: 0,
    prs_created: 0,
    issues_created: 0,
    issue_comments: 0,
    commit_comments: 0,
    pr_review_comments: 0,
  },
  {
    id: 1,
    login: "nickytonline",
    avatar_url: getAvatarByUsername("nickytonline"),
    oscr: Number(Math.random().toFixed(2)),
    company: "OpenSauced",
    location: "Canada",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    commits: 0,
    prs_created: 0,
    issues_created: 0,
    issue_comments: 0,
    commit_comments: 0,
    pr_review_comments: 0,
  },
  {
    id: 2,
    login: "brandonroberts",
    avatar_url: getAvatarByUsername("brandonroberts"),
    oscr: Number(Math.random().toFixed(2)),
    company: "OpenSauced",
    location: "United States",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    commits: 0,
    prs_created: 0,
    issues_created: 0,
    issue_comments: 0,
    commit_comments: 0,
    pr_review_comments: 0,
  },
];
