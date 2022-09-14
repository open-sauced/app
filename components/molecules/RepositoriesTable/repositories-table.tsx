import Avatar from "components/atoms/Avatar/avatar";
import Pill from "components/atoms/Pill/pill";
import Sparkline from "components/atoms/Sparkline/sparkline";
import TableTitle from "components/atoms/TableTitle/table-title";
import React from "react";
import Pagination from "../Pagination/pagination";
import PaginationGotoPage from "../PaginationGotoPage/pagination-goto-page";
import PaginationResults from "../PaginationResults/pagination-result";
import PullRequestOverview from "../PullRequestOverview/pull-request-overview";
import TableRepositoryName from "../TableRepositoryName/table-repository-name";

export interface Repositories {
  name?: string;
  handle?: string;
  activity?: string;
  prOverview: {
    open?: number;
    merged?: number;
    closed?: number;
    draft?: number;
    churn?: number;
    churnDirection?: "up" | "down";
  };
  last30days?: Object[];
}

interface RepositoriesTableProps {
  listOfRepositories?: Repositories[];
}

const classNames = {
  row: "flex gap-4 items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "flex-1",
    activity: "flex-1 shrink",
    prOverview: "flex-1",
    prVelocity: "flex-1",
    spam: "flex-1",
    contributors: "flex-1",
    last30days: "flex-1"
  }
};

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({ listOfRepositories }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden">

      {/* Table Header */}
      <header className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className={classNames.cols.repository}><TableTitle text="Repository"></TableTitle></div>
        <div className={classNames.cols.activity}><TableTitle text="Activity"></TableTitle></div>
        <div className={classNames.cols.prOverview}><TableTitle text="PR Overview"></TableTitle></div>
        <div className={classNames.cols.prVelocity}><TableTitle text="PR Velocity"></TableTitle></div>
        <div className={classNames.cols.spam}><TableTitle text="SPAM"></TableTitle></div>
        <div className={classNames.cols.contributors}><TableTitle text="Contributors"></TableTitle></div>
        <div className={classNames.cols.last30days}><TableTitle text="Last 30 Days"></TableTitle></div>
      </header>

      {/* Table Rows */}
      <section className="flex flex-col">

        {listOfRepositories.map(({name, handle, activity, prOverview, last30days}) => 
          
          // Table Row
          <div className={`${classNames.row}`} key={`${handle}/${name}`}>  
            
            {/* Column: Repository Name */}
            <div className={classNames.cols.repository}>
              <TableRepositoryName avatarURL={""} name={name} handle={handle}></TableRepositoryName>
              
            </div>

            {/* Column: Activity */}
            <div className={classNames.cols.activity}>
              <Pill text={activity} />
              
            </div>

            {/* Column: PR Overview */}
            <div className={classNames.cols.prOverview}>
              <PullRequestOverview open={prOverview.open} merged={prOverview.merged} closed={prOverview.closed} draft={prOverview.draft} churn={prOverview.churn} churnDirection={prOverview.churnDirection}></PullRequestOverview>
              
            </div>

            {/* Column: PR Velocity */}
            <div className={`flex items-center gap-3 ${classNames.cols.prVelocity}`}>
              <div>2mo</div>
              <Pill text={"+102%"} size="small" color="green" />
            </div>

            {/* Column: SPAM */}
            <div className={`flex items-center gap-3 ${classNames.cols.prVelocity}`}>
              <div>2mo</div>
              <Pill text={"+102%"} size="small" color="green" />
            </div>
            
            {/* Column: Contributors */}
            <div className={`flex ${classNames.cols.contributors}`}>
              <Avatar avatarURL={""} initials={"OS"} size="base" hasBorder isCircle />
              <Avatar avatarURL={""} initials={"OS"} size="base" hasBorder isCircle />
              <Avatar avatarURL={""} initials={"OS"} size="base" hasBorder isCircle />
              <Avatar avatarURL={""} initials={"OS"} size="base" hasBorder isCircle />
              <Avatar avatarURL={""} initials={"OS"} size="base" hasBorder isCircle />
            </div>
            
            {/* Column: Last 30 Days */}
            <div className={classNames.cols.last30days}>
              <Sparkline data={last30days} />
            </div>
          </div>

        )}
      </section>

      {/* Table Footer */}
      <footer className="flex justify-between items-center py-3 px-6 border-t">
        <div className="">
          <PaginationResults from={1} to={10} total={93000} entity={"repositories"} />
        </div>

        <div className="flex items-center gap-4">
          <Pagination pages={[]} totalPage={0} page={12} onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          } } />
          <PaginationGotoPage currentPage={12} name={""} />
        </div>
      </footer>
    </div>
  );
};

export default RepositoriesTable;