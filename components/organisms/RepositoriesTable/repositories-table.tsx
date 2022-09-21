import { Serie } from "@nivo/line";
import TableTitle from "components/atoms/TableTitle/table-title";
import PullRequestOverview from "components/molecules/PullRequestOverview/pull-request-overview";
import RepoRow from "components/molecules/RepoRow/repo-row";
import TableRepositoryName from "components/molecules/TableRepositoryName/table-repository-name";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import { StaticImageData } from "next/image";
import { useState } from "react";
import { ChevronUpIcon } from "@primer/octicons-react";
import { ChevronDownIcon } from "@primer/octicons-react";
import Pagination from "../../molecules/Pagination/pagination";
import PaginationResults from "../../molecules/PaginationResults/pagination-result";
import Pill from "components/atoms/Pill/pill";

export interface ContributorsRows {
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
}

export interface RepositoriesRows {
  name?: string;
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
}

export const classNames = {
  row: "flex gap-4 items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "flex-1",
    activity: "flex-1 flex justify-center shrink",
    prOverview: "flex-1",
    prVelocity: "flex justify-center  items-center gap-3 flex-1",
    spam: "flex items-center gap-3 flex-1",
    contributors: "flex-1",
    last30days: "flex-1",
  },
};

const RepositoriesTable = (props: RepositoriesTableProps): JSX.Element => {
  const isNotMobile = useMediaQuery("(min-width: 768px)");

  return (
    <div className="flex flex-col rounded-lg overflow-hidden border">
      {isNotMobile ? <DesktopRepoTable {...props} /> : <MobileRepoTable {...props} />}
    </div>
  );
};

const MobileRepoTable = ({ listOfRepositories, meta }: RepositoriesTableProps): JSX.Element => {
  const [tableOpen, setTableOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex justify-between py-4 px-6 bg-light-slate-3 gap-2">
        <div className="flex-1">
          <TableTitle text="Repository"></TableTitle>
        </div>
        <div className="flex-1">
          <TableTitle text="Pr Overview"></TableTitle>
        </div>
      </div>
      <section className="flex  flex-col">
        {Array.isArray(listOfRepositories) &&
          listOfRepositories.length > 0 &&
          listOfRepositories.map(
            (
              {
                name,
                handle,
                owner_avatar: ownerAvatar,
                activity = "high activity",
                openPrsCount,
                closedPrsCount,
                draftPrsCount,
                mergedPrsCount,
                spamPrsCount,
                churn,
                churnTotalCount,
                churnDirection,
              },
              index
            ) => (
              <div key={index} className="odd:bg-white px-5 py-2  even:bg-light-slate-2">
                <div className="flex items-center gap-x-3">
                  <div className="w-[55%]">
                    <TableRepositoryName avatarURL={ownerAvatar} name={name} handle={handle} />
                  </div>
                  <div className="w-[45%]">
                    <PullRequestOverview
                      open={openPrsCount}
                      merged={mergedPrsCount}
                      closed={closedPrsCount}
                      draft={draftPrsCount}
                      churn={churnTotalCount}
                      churnDirection={`${churnDirection}`}
                    />
                  </div>
                  <div>
                    <div
                      onClick={() => setTableOpen(!tableOpen)}
                      className="border rounded-md p-1 flex items-center justify-between "
                    >
                      {tableOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </div>
                  </div>
                </div>
                <div className={`${!tableOpen && "max-h-0"} font-medium text-light-slate-11 text-sm transition`}>
                  <div className="flex items-center py-3 border-b justify-between">
                    <div>Activity</div>
                    <Pill text={activity}></Pill>
                  </div>
                  <div className="flex items-center py-3 border-b justify-between">
                    <div>Pr Velocity</div>
                    <div className="flex text-base gap-x-3">
                      <div>3 days</div>
                      <Pill text="10%" size="small" color="green" />
                    </div>
                  </div>
                  <div className="flex items-center py-3 border-b justify-between">
                    <div>Spam</div>
                    <div className="flex text-base gap-x-3">
                      <div>5 PRs</div>
                      <Pill text="10%" size="small" color="green" />
                    </div>
                  </div>
                  <div className="flex items-center py-3 justify-between">
                    <div>Contributors</div>
                    <div className="flex text-base gap-x-3">
                      <div>5 PRs</div>
                      <Pill text="10%" size="small" color="green" />
                    </div>
                  </div>
                  <div className="text-center border rounded-lg py-1 mt-3">Hide details</div>
                </div>
              </div>
            )
          )}
      </section>
    </>
  );
};

const DesktopRepoTable = ({ listOfRepositories, meta }: RepositoriesTableProps): JSX.Element => {
  return (
    <>
      {/* Table Header */}
      <div className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className={classNames.cols.repository}>
          <TableTitle text="Repository"></TableTitle>
        </div>
        <div className={classNames.cols.activity}>
          <TableTitle text="Activity"></TableTitle>
        </div>
        <div className={classNames.cols.prOverview}>
          <TableTitle text="PR Overview"></TableTitle>
        </div>
        <div className={classNames.cols.prVelocity}>
          <TableTitle text="PR Velocity"></TableTitle>
        </div>
        <div className={classNames.cols.spam}>
          <TableTitle text="SPAM"></TableTitle>
        </div>
        <div className={classNames.cols.contributors}>
          <TableTitle text="Contributors"></TableTitle>
        </div>
        <div className={classNames.cols.last30days}>
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
            from={meta.page}
            to={meta.page + meta.limit - 1}
            total={meta.pageCount}
            entity={"repositories"}
          />
        </div>

        <div className="flex items-center gap-4">
          <Pagination
            pages={[]}
            totalPage={meta.pageCount}
            page={meta.page}
            onPageChange={function (page: number): void {
              throw new Error("Function not implemented.");
            }}
            goToPage
          />
        </div>
      </div>
    </>
  );
};

export default RepositoriesTable;
