import { Serie } from "@nivo/line";
import TableTitle from "components/atoms/TableTitle/table-title";
import RepoRow from "components/molecules/RepoRow/repo-row";
import { StaticImageData } from "next/image";
import Pagination from "../../molecules/Pagination/pagination";
import PaginationResults from "../../molecules/PaginationResults/pagination-result";


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
  meta: Meta
}

export const classNames = {
  row: "flex gap-4 items-center py-3 px-6 odd:bg-white even:bg-light-slate-2",
  cols: {
    repository: "flex-1",
    activity: "flex-1 flex justify-center shrink",
    prOverview: "flex-1",
    prVelocity: "flex items-center gap-3 flex-1",
    spam: "flex items-center gap-3 flex-1",
    contributors: "flex-1",
    last30days: "flex-1"
  }
};

const RepositoriesTable: React.FC<RepositoriesTableProps> = ({ listOfRepositories, meta }) => {
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
        {/* Just making sure its not trying to loop through null or undefined values*/}
        {Array.isArray(listOfRepositories)  && listOfRepositories.length > 0 && listOfRepositories.map((item) =>

          <RepoRow  key={`${item.handle}/${item.name}`} repo={item} />

        )}
      </section>

      {/* Table Footer */}
      <div className="flex justify-between items-center py-3 px-6 border-t">
        <div className="">
          <PaginationResults from={meta.page} to={meta.page + meta.limit - 1} total={meta.pageCount} entity={"repositories"} />
        </div>

        <div className="flex items-center gap-4">
          <Pagination pages={[]} totalPage={meta.pageCount} page={meta.page} onPageChange={function (page: number): void {
            throw new Error("Function not implemented.");
          } } goToPage />
        </div>
      </div>
    </div>
  );
};

export default RepositoriesTable;
