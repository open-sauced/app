import { Serie } from "@nivo/line";
import TableTitle from "components/atoms/TableTitle/table-title";
import RepoRow from "components/molecules/RepoRow/repo-row";
import { StaticImageData } from "next/image";
import Pagination from "../../molecules/Pagination/pagination";
import PaginationResults from "../../molecules/PaginationResults/pagination-result";
import clsx from "clsx";
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
}

export const classNames = {
  row: "hidden md:flex gap-4    items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "w-[30%] lg:flex-1 ",
    activity: "flex-1  flex justify-center shrink",
    prOverview: "flex-1 ",
    prVelocity: "flex justify-center items-center gap-3 flex-1",
    spam: "flex items-center justify-center lg:justify-start gap-3 flex-1 ",
    contributors: "flex-1 items-center",
    last30days: "flex-1"
  }
};

const RepositoriesTable = ({ listOfRepositories, meta, page, setPage }: RepositoriesTableProps): JSX.Element => {
  return (
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
        <div className={clsx(classNames.cols.last30days, "hidden lg:flex" )}>
          <TableTitle text="Last 30 Days"></TableTitle>
        </div>
      </div>
      <section className="flex  flex-col">
        {Array.isArray(listOfRepositories) &&
          listOfRepositories.length > 0 &&
          listOfRepositories.map((item, index) => <RepoRow key={`${item.handle}/${item.name}/${index}`} repo={item} />)}
      </section>

      {/* Table Footer */}
      <div className="py-4 px-6 flex justify-between items-center">
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
  );
};


const DesktopRepoTable = ({ listOfRepositories, meta, page, setPage }: RepositoriesTableProps): JSX.Element => {
  return (
    <>
      {/* Table Header */}
      <div className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className={clsx(classNames.cols.repository, "hidden md:block")}>
          <TableTitle text="Repository"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.activity, "hidden md:block")}>
          <TableTitle text="Activity"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.prOverview, "hidden md:block")}>
          <TableTitle text="PR Overview"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.prVelocity, "hidden md:block")}>
          <TableTitle text="PR Velocity"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.spam, "hidden md:block")}>
          <TableTitle text="SPAM"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.contributors, "hidden md:block")}>
          <TableTitle text="Contributors"></TableTitle>
        </div>
        <div className={clsx(classNames.cols.last30days, "hidden md:block")}>
          <TableTitle text="Last 30 Days"></TableTitle>
        </div>
      </div>

      {/* Table Rows */}
      <section className="flex flex-col">
        {/* Just making sure its not trying to loop through null or undefined values*/}
        {Array.isArray(listOfRepositories) &&
          listOfRepositories.length > 0 &&
          listOfRepositories.map((item) => <RepoRow key={`${item.handle}/${item.name}`} repo={item} />)}
      </section>

      {/* Table Footer */}
      <div className="flex justify-between items-center py-3 px-6 border-t">
        <div className="">
          <PaginationResults
            from={page === 1 ? page : page * meta.limit}
            to={page === 1 ? meta.limit : page * meta.limit + meta.limit}
            total={meta.itemCount}
            entity={"repositories"}
          />
        </div>

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
            goToPage
          />
        </div>
      </div>
    </>
  );
};

export default RepositoriesTable;
