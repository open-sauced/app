import { Serie } from "@nivo/line";
import Avatar from "components/atoms/Avatar/avatar";
import Pill from "components/atoms/Pill/pill";
import Sparkline from "components/atoms/Sparkline/sparkline";
import TableTitle from "components/atoms/TableTitle/table-title";
import { StaticImageData } from "next/image";
import React from "react";
import Pagination from "../Pagination/pagination";
import PaginationGotoPage from "../PaginationGotoPage/pagination-goto-page";
import PaginationResults from "../PaginationResults/pagination-result";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";

export interface ContributorsRows {
  avatarURL?: string | StaticImageData;
  initials?: string;
  alt?: string;
}

export interface RepositoriesRows {
  name?: string;
  handle?: string;
  activity?: string;
  prOverview?: {
    open?: number;
    merged?: number;
    closed?: number;
    draft?: number;
    churn?: number;
    churnDirection?: string;
  };
  prVelocity?: {
    amount?: string;
    churn?: string;
    churnDirection?: string;
  };
  spam?: {
    amount?: string;
    churn?: string;
    churnDirection?: string;
  };
  contributors?: ContributorsRows[];
  last30days?: Serie[];
}

interface RepositoriesTableProps {
  listOfRepositories: RepositoriesRows[];
  meta?: Meta
}

const classNames = {
  row: "flex gap-4 items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "flex-1",
    activity: "flex-1 shrink",
    prOverview: "flex-1",
    prVelocity: "flex items-center gap-3 flex-1",
    spam: "flex items-center gap-3 flex-1",
    contributors: "flex-1",
    last30days: "flex-1"
  }
};

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({ listOfRepositories }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border">

      {/* Table Header */}
      <div className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className={classNames.cols.repository}><TableTitle text="Repository"></TableTitle></div>
        <div className={classNames.cols.activity}><TableTitle text="Activity"></TableTitle></div>
        <div className={classNames.cols.prOverview}><TableTitle text="PR Overview"></TableTitle></div>
        <div className={classNames.cols.prVelocity}><TableTitle text="PR Velocity"></TableTitle></div>
        <div className={classNames.cols.spam}><TableTitle text="SPAM"></TableTitle></div>
        <div className={classNames.cols.contributors}><TableTitle text="Contributors"></TableTitle></div>
        <div className={classNames.cols.last30days}><TableTitle text="Last 30 Days"></TableTitle></div>
      </div>

      {/* Table Rows */}
      <section className="flex flex-col">

        {listOfRepositories?.map(({name, handle, activity, prOverview, prVelocity, spam, contributors, last30days}) =>

          // Table Row
          <div className={`${classNames.row}`} key={`${handle}/${name}`}>

            {/* Column: Repository Name */}
            <div className={classNames.cols.repository}>
              <TableRepositoryName avatarURL={""} name={name} handle={handle}></TableRepositoryName>

            </div>

            {/* Column: Activity */}
            <div className={classNames.cols.activity}>
              { activity &&
                <Pill text={activity} />
              }

            </div>

            {/* Column: PR Overview */}
            <div className={classNames.cols.prOverview}>
              <PullRequestOverview open={prOverview?.open} merged={prOverview?.merged} closed={prOverview?.closed} draft={prOverview?.draft} churn={prOverview?.churn} churnDirection={`${prOverview?.churnDirection}`}></PullRequestOverview>

            </div>

            {/* Column: PR Velocity */}
            <div className={`${classNames.cols.prVelocity}`}>
              <div>{prVelocity?.amount}</div>
              <Pill text={`${prVelocity?.churn}`} size="small" color="green" />
            </div>

            {/* Column: SPAM */}
            <div className={`${classNames.cols.prVelocity}`}>
              <div>{spam?.amount}</div>
              <Pill text={`${spam?.churn}`} size="small" color="green" />
            </div>

            {/* Column: Contributors */}
            <div className={`flex ${classNames.cols.contributors}`}>

              {contributors?.map(({ avatarURL, initials, alt}) =>
                <Avatar key={`${initials}-${alt}`} avatarURL={avatarURL} initials={initials} size={32} hasBorder isCircle />
              )}
            </div>

            {/* Column: Last 30 Days */}
            <div className={classNames.cols.last30days}>
              { last30days &&
                <Sparkline data={last30days} />
              }
            </div>
          </div>

        )}
      </section>

      {/* Table Footer */}
      <div className="flex justify-between items-center py-3 px-6 border-t">
        <div className="">
          <PaginationResults from={1} to={10} total={93000} entity={"repositories"} />
        </div>

        <div className="flex items-center gap-4">
          <Pagination pages={[]} totalPage={0} page={12} onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          } } goToPage />
        </div>
      </div>
    </div>
  );
};

export default RepositoriesTable;
