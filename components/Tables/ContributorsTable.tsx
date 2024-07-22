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
} from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import { useState } from "react";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { OscrPill } from "components/Contributors/OscrPill";
import Pill from "components/atoms/Pill/pill";
import CardRepoList from "components/molecules/CardRepoList/card-repo-list";
import Search from "components/atoms/Search/search";
import { calcDistanceFromToday } from "lib/utils/date-utils";

// TODO: proposed type, needs real data once api/#959
type ContributorRow = {
  login: string;
  oscr: number;
  repositories: { name: string; full_name: string }[];
  tags: string[]; // YOLO, internal, outsider, recurring, lottery
  company: string;
  location: string;
  total_contributions: number; // total = PRs, issues, commits, etc.
  last_contributed: string; // date time string;
};

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
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

export default function ContributorsTable() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  function onSearchContributors(searchTerm?: string) {
    if (searchTerm && searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm(undefined);
    }
  }

  const contributorsColumnHelper = createColumnHelper<ContributorRow>();
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
    contributorsColumnHelper.accessor("tags", {
      header: "Tags",
      enableSorting: false,
      enableGlobalFilter: false,
      cell: (info) => (
        <div className="flex gap-2">
          {info.row.original.tags.map((tag) => (
            <Pill key={`${info.row.id}_${tag}`} text={tag} />
          ))}
        </div>
      ),
    }),
    contributorsColumnHelper.accessor("repositories", {
      header: "Repositories",
      enableSorting: false,
      filterFn: "includesString",
      cell: (info) => (
        <div className="flex gap-2">
          <CardRepoList
            repoList={info.row.original.repositories.map((repository) => {
              return {
                repoOwner: repository.full_name.split("/")[0],
                repoName: repository.name,
                repoIcon: getAvatarByUsername(repository.full_name.split("/")[0]),
              };
            })}
          />
        </div>
      ),
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
    contributorsColumnHelper.accessor("last_contributed", {
      header: "Last Contributed",
      sortingFn: "datetime",
      enableGlobalFilter: false,
      cell: (info) => <p>{calcDistanceFromToday(new Date(info.row.original.last_contributed))}</p>,
    }),
  ];

  const table = useReactTable({
    columns: defaultColumns,
    data: fakeData, // TODO: get real data!
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: "fuzzy",
    onGlobalFilterChange: setSearchTerm,
    state: { globalFilter: searchTerm },
  });

  return (
    <div className="flex flex-col gap-4">
      <Search
        name="Search contributors"
        placeholder="Search contributors"
        onSearch={onSearchContributors}
        onChange={onSearchContributors}
        className="w-full lg:max-w-xs"
      />
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
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// TODO: REMOVE mock data and utils
const fakeData: ContributorRow[] = [
  {
    login: "zeucapua",
    oscr: Number(Math.random().toFixed(2)),
    repositories: [
      { name: "app", full_name: "open-sauced/app" },
      { name: "gust", full_name: "zeucapua/gust" },
    ],
    tags: ["internal", "lottery"],
    company: "OpenSauced",
    location: "Disneyland",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    last_contributed: generateRandomDOB(),
  },
  {
    login: "nickytonline",
    oscr: Number(Math.random().toFixed(2)),
    repositories: [
      { name: "app", full_name: "open-sauced/app" },
      { name: "forem", full_name: "forem" },
    ],
    tags: ["internal", "lottery"],
    company: "OpenSauced",
    location: "Canada",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    last_contributed: generateRandomDOB(),
  },
  {
    login: "brandonroberts",
    oscr: Number(Math.random().toFixed(2)),
    repositories: [
      { name: "app", full_name: "open-sauced/app" },
      { name: "analog", full_name: "analogjs/analog" },
    ],
    tags: ["internal", "lottery", "yolo"],
    company: "OpenSauced",
    location: "United States",
    total_contributions: 1 + Number((Math.random() * 100).toPrecision(2)),
    last_contributed: generateRandomDOB(),
  },
];

function generateRandomDOB(): string {
  const random = getRandomDate(new Date("2024-07-01T01:57:45.271Z"), new Date());
  return random.toISOString();
}

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}
