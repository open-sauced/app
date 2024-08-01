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
  Table as TableDef,
} from "@tanstack/react-table";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import Skeleton from "react-loading-skeleton";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Avatar from "components/atoms/Avatar/avatar";
import { getAvatarByUsername } from "lib/utils/github";
import HoverCardWrapper from "components/molecules/HoverCardWrapper/hover-card-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "components/shared/Table";
import { OscrPill } from "components/Contributors/Oscr";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { setQueryParams } from "lib/utils/query-params";
import Pagination from "components/molecules/Pagination/pagination";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Button from "components/shared/Button/button";
import InfoTooltip from "components/shared/InfoTooltip";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import { useFetchMetricStats } from "lib/hooks/api/useFetchMetricStats";
import { getDailyPullRequestsHistogramToDays } from "lib/utils/repo-page-utils";
import Card from "components/atoms/Card/card";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import errorImage from "../../public/assets/images/lotto-factor-empty.png";

const AddToContributorInsightModal = dynamic(() => import("components/Contributors/AddToContributorInsightModal"), {
  ssr: false,
});

const AddToContributorInsightDrawer = dynamic(() => import("components/Contributors/AddToContributorInsightDrawer"), {
  ssr: false,
});

type OrderDirection = "ASC" | "DESC";

type ContributorsTableProps = {
  contributors: DbRepoContributor[] | undefined;
  meta: Meta | null;
  isLoading: boolean;
  isError: boolean;
  oscrSorting: OrderDirection;
  setOscrSorting: (value: OrderDirection) => void;
};

// TODO: silo into new component file?
function Sparkline({ repository, login }: { repository: string; login: string }) {
  const { data: stats, isLoading } = useFetchMetricStats({
    variant: "prs",
    repository,
    range: 30,
    contributor: login,
  });

  const dailyData = useMemo(() => getDailyPullRequestsHistogramToDays({ stats, range: 30 }), [stats]);
  return isLoading ? (
    <Skeleton width="100%" />
  ) : (
    <ResponsiveContainer width="100%" height={50}>
      <LineChart data={dailyData}>
        <Line type="monotone" dataKey="prs_count" stroke="#ea580c" fill="#fb923c" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const contributorsColumnHelper = createColumnHelper<DbRepoContributor>();
const defaultColumns = ({ repository, isLoggedIn }: { repository: string; isLoggedIn: boolean }) => [
  contributorsColumnHelper.display({
    id: "selector",
    header: ({ table }: { table: TableDef<DbRepoContributor> }) => (
      <Checkbox
        key={"selector_all"}
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(checked) => table.toggleAllRowsSelected(Boolean(checked.valueOf()))}
      />
    ),
    cell: ({ row }: { row: Row<DbRepoContributor> }) => (
      <Checkbox
        key={row.id}
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(Boolean(checked.valueOf()))}
      />
    ),
  }),
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
    header: () => (
      <div className="flex gap-2 w-fit items-center hover:bg-slate-50 rounded-md px-2 py-1 cursor-pointer">
        <p>OSCR Rating</p>
        <InfoTooltip information="OSCR evaluates the engagement and impact of contributors across the entire open source ecosystem." />
      </div>
    ),
    enableSorting: true,
    enableGlobalFilter: false,
    cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} hideRating={!isLoggedIn} />,
  }),
  contributorsColumnHelper.accessor("company", {
    header: "Company",
  }),
  contributorsColumnHelper.accessor("location", {
    header: "Location",
  }),
  contributorsColumnHelper.accessor("total_contributions", {
    header: () => (
      <div className="flex gap-2 w-fit items-center hover:bg-slate-50 rounded-md px-2 py-1 cursor-pointer">
        <p>Contributions</p>
        <InfoTooltip information="A total of PR, issue, and commit contributions for this repository." />
      </div>
    ),
  }),
  contributorsColumnHelper.display({
    header: "Last 30 Days",
    cell: ({ row }) => <Sparkline repository={repository} login={row.original.login} />,
  }),
];

const mobileColumns = ({ isLoggedIn }: { isLoggedIn: boolean }) => [
  {
    id: "mobileContributor",
    header: "",
    columns: [
      {
        id: "selector",
        header: ({ table }: { table: TableDef<DbRepoContributor> }) => (
          <Checkbox
            key={"selector_all"}
            checked={table.getIsAllRowsSelected()}
            onCheckedChange={(checked) => table.toggleAllRowsSelected(Boolean(checked.valueOf()))}
          />
        ),
        cell: ({ row }: { row: Row<DbRepoContributor> }) => (
          <Checkbox
            key={row.id}
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(Boolean(checked.valueOf()))}
          />
        ),
      },
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
        header: () => (
          <div className="flex gap-2 w-fit items-center">
            <p>OSCR</p>
            <InfoTooltip information="OSCR evaluates the engagement and impact of contributors across the entire open source ecosystem." />
          </div>
        ),
        enableSorting: true,
        cell: (info) => <OscrPill rating={info.row.original.oscr ?? 0} hideRating={!isLoggedIn} />,
      }),
      {
        id: "expand",
        header: "",
        cell: ({ row }: { row: Row<DbRepoContributor> }) => {
          return (
            row.getCanExpand() && (
              <button onClick={row.getToggleExpandedHandler()}>
                {row.getIsExpanded() ? (
                  <RiArrowDownSLine className="text-xl m-1 text-slate-500 border border-slate-200 rounded-sm" />
                ) : (
                  <RiArrowUpSLine className="text-xl m-1 text-slate-500 border border-slate-200 rounded-sm" />
                )}
              </button>
            )
          );
        },
      },
    ],
  },
];

export default function ContributorsTable({
  contributors,
  meta,
  oscrSorting,
  setOscrSorting,
  isLoading,
  isError,
}: ContributorsTableProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const router = useRouter();
  const { userId } = useSupabaseAuth();
  const isLoggedIn = Boolean(userId);
  const repository = `${router.query.org}/${router.query.repo}`;

  const [isAddToContributorInsightModalOpen, setIsAddToContributorInsightModalOpen] = useState(false);
  const [sorting, setSorting] = useState<TableState["sorting"]>([{ id: "oscr", desc: oscrSorting === "DESC" }]);
  const [selectedContributors, setSelectedContributors] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    columns: useMemo(
      () => (isMobile ? mobileColumns({ isLoggedIn }) : defaultColumns({ repository, isLoggedIn })),
      [isMobile]
    ),
    data: contributors ?? [],
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand: () => isMobile,
    onRowSelectionChange: setSelectedContributors,
    getExpandedRowModel: getExpandedRowModel(),
    getRowId: (row) => row.login,
    state: { sorting, rowSelection: selectedContributors },
  });

  return (
    <>
      {Object.keys(selectedContributors).length > 0 && (
        <div className="flex items-center justify-between px-4">
          <p>{Object.keys(selectedContributors).length} selected</p>
          {isMobile ? (
            <AddToContributorInsightDrawer repository={repository} contributors={Object.keys(selectedContributors)} />
          ) : (
            <Button variant="primary" onClick={() => setIsAddToContributorInsightModalOpen(true)}>
              Add to Insight
            </Button>
          )}
        </div>
      )}
      <Card className="!p-0">
        {isLoading && (
          <div className="flex flex-col w-full gap-4 px-4 my-8">
            <SkeletonWrapper count={4} height={32} />
          </div>
        )}

        {!isLoading && (isError || !contributors) && (
          <section className="flex flex-col gap-4 items-center">
            <Image src={errorImage} alt="Contributors Table error image" />
            <h2 className="font-medium">There are no contributors loaded.</h2>
          </section>
        )}

        {!isError && !isLoading && (
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={`!font-medium !text-slate-500 ${
                          header.id === "1_mobileContributor_selector" && "hidden"
                        }`}
                      >
                        {header.column.columnDef.enableSorting ? (
                          <div className="flex gap-2">
                            <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                            <button
                              onClick={() => {
                                const { enableSorting } = header.column.columnDef;
                                const isAscending = Boolean(
                                  sorting.find((item) => item.id === header.id && !item.desc)
                                );

                                if (enableSorting) {
                                  setOscrSorting(isAscending ? "ASC" : "DESC");

                                  setSorting((currentState) => {
                                    // future-proof, set other column sorting to false
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
                            >
                              {header.column.columnDef.enableSorting &&
                                (Boolean(sorting.find((item) => item.id === header.id && !item.desc)) ? (
                                  <FaSortUp className="text-lg p-0.5" />
                                ) : (
                                  <FaSortDown className="text-lg p-0.5" />
                                ))}
                            </button>
                          </div>
                        ) : (
                          <>{flexRender(header.column.columnDef.header, header.getContext())}</>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <>
                    <TableRow
                      key={row.id}
                      className={`${row.getIsExpanded() && "border-b-0"} hover:bg-slate-50 text-slate-700`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={`w-fit max-w-lg ${row.getIsExpanded() && "text-orange-600 font-medium"}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow key={`expanded_${row.id}`}>
                        <TableCell colSpan={row.getVisibleCells().length}>
                          <div className="flex flex-col gap-2 font-normal text-slate-500">
                            <Sparkline repository={repository} login={row.original.login} />
                            <p className="text-center text-slate-400 p-1.5">PR Activity Last 30d</p>

                            <div className="flex justify-between pt-2">
                              <div className="flex gap-2 w-fit items-center">
                                <p>Contributions</p>
                                <InfoTooltip information="A total of PR, issue, and commit contributions for this repository." />
                              </div>
                              <span className="">{row.original.total_contributions}</span>
                            </div>

                            <p className="flex justify-between pt-2">
                              Company
                              <span className="">{row.original.company}</span>
                            </p>

                            <p className="flex justify-between pt-2">
                              Location
                              <span className="">{row.original.location}</span>
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </>
        )}

        <AddToContributorInsightModal
          repository={repository}
          contributors={Object.keys(selectedContributors)}
          isOpen={isAddToContributorInsightModalOpen}
          onCloseModal={() => setIsAddToContributorInsightModalOpen(false)}
        />
      </Card>
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
    </>
  );
}
