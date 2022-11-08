import { User } from "@supabase/supabase-js";
import clsx from "clsx";

import Search from "components/atoms/Search/search";
import Select from "components/atoms/Select/custom-select";
import TableTitle from "components/atoms/TableTitle/table-title";
import Title from "components/atoms/Typography/title";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import InsightTableRow from "../InsightTableRow/insight-table-row";

interface InsightPageTableProps {
  user: User | null;
  insights: DbUserInsight[]
}

const selectOptions = [
  { name: "Last updated - ASC", value: "10" },
  { name: "Last updated - DSC", value: "10" },
  { name: "Name - ASC", value: "10" },
  { name: "Name - DSC", value: "10" }
];

const InsightPageTable = ({ user, insights }: InsightPageTableProps) => {
  return (
    <div>
      {/* Table title */}
      <div className="flex justify-between h-11 items-center">
        <div className="flex gap-x-4 items-end">
          <Title className="!text-2xl !leading-none " level={1}>
            All Insight Pages
          </Title>
        </div>
        <div className="w-full  md:w-3/5 flex gap-x-5 items-center justify-end">
          {/* <Select
            placeholder="Last updated - ASC"
            options={selectOptions}
            className="w-[275px]"
            label="Sort by"
          ></Select>
          <div className="w-58 hidden lg:block">
            <Search placeholder="Search repositories" className="max-w-full" name={"query"} />
          </div> */}
        </div>
      </div>

      {/* Table section */}

      <div className="flex flex-col mt-6 rounded-lg overflow-scroll border">
        <div className="md:flex py-4 px-6 bg-light-slate-3 gap-10 lg:min-w-[1280px]">
          <div className={clsx("flex-1 min-w-[140px] max-w-[150px] ")}>
            <TableTitle text="Insight page"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.activity, "!max-w-[160px]  hidden lg:block")}>
            <TableTitle text="Repositories"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
            <TableTitle text="avg prs opened"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prVelocity, "!max-w-[130px] !min-w-[130px] !justify-start")}>
            <TableTitle text="avg pr velocity"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.spam, "!max-w-[180px] hidden lg:block")}>
            <TableTitle text="members"></TableTitle>
          </div>
        </div>
        {insights.map(insight => (
          <InsightTableRow key={insight.id} insight={insight} user={user} />
        ))}
      </div>
    </div>
  );
};

export default InsightPageTable;
