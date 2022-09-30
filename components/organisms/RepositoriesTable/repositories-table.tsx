import { Serie } from "@nivo/line";
import TableTitle from "components/atoms/TableTitle/table-title";
import RepoRow from "components/molecules/RepoRow/repo-row";
import { StaticImageData } from "next/image";
import Pagination from "../../molecules/Pagination/pagination";
import PaginationResults from "../../molecules/PaginationResults/pagination-result";
import clsx from "clsx";
import TableHeader from "components/molecules/TableHeader/table-header";
import Select from "components/atoms/Select/custom-select";
export interface ContributorsRows {
  name?: string;
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
}

export interface RepositoriesRows {
  id: string;
  name?: string;
  owner?: string;
  handle?: string;
  activity?: string;
  owner_avatar?: string;
  openPrsCount?: number;
  mergedPrsCount?: number;
  closedPrsCount?: number;
  draftPrsCount?: number;
  churnTotalCount?: number;
  churnDirection?: string;
  amount?: string;
  churn?: string;
  spamPrsCount?: number;
  prVelocityCount?: number;
  prVelocity?: {
    amount?: string;
    churn?: string;
    churnDirection?: string;
  };

  contributors?: ContributorsRows[];
  last30days?: Serie[];
}

interface RepositoriesTableProps {
  listOfRepositories: RepositoriesRows[];
  meta: Meta;
  page: number;
  setPage: Function;
  setLimit: Function;
}

export const classNames = {
  row: "hidden md:flex gap-4    items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "w-[30%] lg:flex-1  lg:min-w-[200px] ",
    activity: "flex-1 lg:min-w-[100px] flex ",
    prOverview: "flex-1 lg:min-w-[170px] ",
    prVelocity: "flex justify-center lg:min-w-[100px] items-center gap-3 flex-1",
    spam: "flex items-center justify-center lg:min-w-[50px] lg:justify-start gap-3 flex-1 ",
    contributors: "flex-1 lg:min-w-[200px] items-center",
    last30days: "flex-1 lg:min-w-[150px]"
  }
};

const RepositoriesTable = ({
  listOfRepositories,
  setLimit,
  meta,
  page,
  setPage
}: RepositoriesTableProps): JSX.Element => {
  return (
    <>
      <TableHeader
        updateLimit={setLimit}
        showing={{
          from: page === 1 ? page : page * meta.limit,
          to: page === 1 ? meta.limit : page * meta.limit + meta.limit,
          total: meta.itemCount,
          entity: "Repositories"
        }}
        limit={meta.limit}
        title="Repositories"
      />
      <div className="flex flex-col rounded-lg overflow-hidden border">
        <div className="flex md:hidden justify-between  py-4 px-6 bg-light-slate-3 gap-2">
          <div className="flex-1 ">
            <TableTitle text="Repository"></TableTitle>
          </div>
          <div className="flex-1">
            <TableTitle text="Pr Overview"></TableTitle>
          </div>
        </div>
        <div className="hidden md:flex py-4 px-6 bg-light-slate-3 gap-2">
          <div className={clsx(classNames.cols.repository)}>
            <TableTitle text="Repository"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.activity)}>
            <TableTitle text="Activity"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prOverview)}>
            <TableTitle text="PR Overview"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prVelocity)}>
            <TableTitle text="PR Velocity"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.spam)}>
            <TableTitle text="SPAM"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.contributors, "hidden lg:flex")}>
            <TableTitle text="Contributors"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.last30days, "hidden lg:flex")}>
            <TableTitle text="Last 30 Days"></TableTitle>
          </div>
        </div>
        <section className="flex  flex-col">
          {Array.isArray(listOfRepositories) &&
            listOfRepositories.length > 0 &&
            listOfRepositories.map((item, index) => (
              <RepoRow key={`${item.handle}/${item.name}/${index}`} repo={item} />
            ))}
        </section>

        {/* Table Footer */}
        <div className="mt-5 w-full px-4 flex flex-col gap-y-3 md:flex-row">
          <Select
            placeholder="10 per page"
            options={[
              { name: "10 per page", value: 10 },
              { name: "20 per page", value: 20 },
              { name: "30 per page", value: 30 },
              { name: "40 per page", value: 40 },
              { name: "50 per page", value: 50 }
            ]}
            className="!w-36 ml-auto md:hidden overflow-x-hidden "
            onChange={function(limit: number):void{setLimit(limit);}}
          ></Select>
          <div className="py-1 md:py-4 flex w-full md:mt-5 justify-between items-center">
            <div>
              <div className="">
                <PaginationResults
                  from={page === 1 ? page : page * meta.limit}
                  to={page === 1 ? meta.limit : page * meta.limit + meta.limit}
                  total={meta.itemCount}
                  entity={"repos"}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <Pagination
                  pages={[]}
                  hasNextPage={meta.hasNextPage}
                  hasPreviousPage={meta.hasPreviousPage}
                  totalPage={meta.pageCount}
                  page={meta.page}
                  onPageChange={function (page: number): void {
                    setPage(page);
                  }}
                  divisor={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepositoriesTable;
