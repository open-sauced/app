import { User } from "@supabase/supabase-js";
import clsx from "clsx";

import TableTitle from "components/atoms/TableTitle/table-title";
import Title from "components/atoms/Typography/title";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import InsightTableRow from "../InsightTableRow/insight-table-row";

interface InsightPageTableProps {
  user: User | null;
  insights: DbUserInsight[];
}

const selectOptions = [
  { name: "Last updated - ASC", value: "10" },
  { name: "Last updated - DSC", value: "10" },
  { name: "Name - ASC", value: "10" },
  { name: "Name - DSC", value: "10" },
];

const InsightPageTable = ({ user, insights }: InsightPageTableProps) => {
  return (
    <div>
      {/* Table title */}
      <div className="flex items-center justify-between h-11">
        <div className="flex items-end gap-x-4">
          <Title className="!text-2xl !leading-none " level={1}>
            All Insight Pages
          </Title>
        </div>
        <div className="flex items-center justify-end w-full md:w-3/5 gap-x-5">
          {/* <Select
            placeholder="Last updated - ASC"
            options={selectOptions}
            className="w-[275px]"
            label="Sort by"
          ></Select>
          <div className="hidden w-58 lg:block">
            <Search placeholder="Search repositories" className="max-w-full" name={"query"} />
          </div> */}
        </div>
      </div>

      {/* Table section */}

      <div className="flex flex-col mt-6 border rounded-lg">
        <div className="md:flex py-4 px-6 bg-light-slate-3 gap-10 lg:min-w-[1280px]">
          <div className={clsx("flex-1 min-w-[140px] max-w-[150px] ")}>
            <TableTitle>Insight page</TableTitle>
          </div>
          <div className={clsx(classNames.cols.activity, "!max-w-[160px]  hidden lg:block")}>
            <TableTitle>Repositories</TableTitle>
          </div>
          <div className={clsx(classNames.cols.prOverview, "!min-w-[100px] !max-w-[130px] ")}>
            <TableTitle>avg prs opened</TableTitle>
          </div>
          <div className={clsx(classNames.cols.prVelocity, "!max-w-[130px] !min-w-[130px] !justify-start")}>
            <TableTitle>avg pr velocity</TableTitle>
          </div>
          <div className={clsx(classNames.cols.spam, "!max-w-[180px] hidden lg:block")}>
            <TableTitle>members</TableTitle>
          </div>
        </div>
        {insights.map((insight) => (
          <InsightTableRow key={insight.id} insight={insight} user={user} />
        ))}
      </div>
    </div>
  );
};

export default InsightPageTable;
