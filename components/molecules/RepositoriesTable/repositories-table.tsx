import Pill from "components/atoms/Pill/pill";
import TableTitle from "components/atoms/TableTitle/table-title";
import React from "react";
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
    chrunDirection?: "up" | "down";
  };
}

interface RepositoriesTableProps {
  listOfRepositories?: Repositories[];
}

const classNames = {
  row: "flex gap-2 items-center py-3 px-6 odd:bg-white even:bg-light-slate-2"
};

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({ listOfRepositories }) => {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden">

      {/* Table Header */}
      <header className="flex py-4 px-6 bg-light-slate-3 gap-2">
        <div className=""><TableTitle text="Repository"></TableTitle></div>
        <div className=""><TableTitle text="Activity"></TableTitle></div>
        <div className=""><TableTitle text="PR Overview"></TableTitle></div>
        <div className=""><TableTitle text="PR Velocity"></TableTitle></div>
        <div className=""><TableTitle text="SPAM"></TableTitle></div>
        <div className=""><TableTitle text="Contributors"></TableTitle></div>
        <div className=""><TableTitle text="Last 30 Days"></TableTitle></div>
      </header>

      {/* Table Rows */}
      <section className="flex flex-col">

        {listOfRepositories.map(({name, handle, activity, prOverview}, index) => 
          <div className={`${classNames.row}`} key={index}>  
            <TableRepositoryName avatarURL={""} name={name} handle={handle}></TableRepositoryName>
            <Pill text={"High"}></Pill>
            <PullRequestOverview></PullRequestOverview>
          </div>
        )}
      </section>

      {/* Table Footer */}
      <footer>

      </footer>
    </div>
  );
};

export default RepositoriesTable;