import clsx from "clsx";
import TableTitle from "components/atoms/TableTitle/table-title";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import React from "react";

const ContributorListTableHeaders = () => {
  return (
    <div className="mt-4">
      <div className="flex justify-between gap-2 px-6 py-4 rounded-t-lg md:hidden bg-light-slate-3">
        <div className="w-[58%]">
          <TableTitle>Developer</TableTitle>
        </div>
        <div className="flex-1 w-[42%]">
          <TableTitle>Languages</TableTitle>
        </div>
      </div>
      <div className="hidden gap-6 px-6 py-4 border rounded-t-lg md:flex bg-light-slate-3">
        <div className={clsx(classNames.cols.repository, "lg:min-w-[280px] flex justify-center")}>
          <TableTitle>Developer</TableTitle>
        </div>
        <div className={clsx(" flex-1 lg:min-w-[100px]   flex justify-center ")}>
          <TableTitle>Act</TableTitle>
        </div>
        <div className={clsx("flex-1 lg:min-w-[100px] ")}>
          <TableTitle>Repositories</TableTitle>
        </div>
        <div className={clsx("flex-1 lg:min-w-[130px] ")}>
          <TableTitle>Last Contributed</TableTitle>
        </div>
        <div className={clsx(" flex flex-1 justify-center    min-w-[140px]")}>
          <TableTitle>Language</TableTitle>
        </div>

        <div className={clsx("flex-1 hidden  lg:flex justify-center lg:min-w-[80px]")}>
          <TableTitle>Time zone</TableTitle>
        </div>
        <div className={clsx("flex-1 hidden lg:flex lg:min-w-fit")}>
          <TableTitle>Contributions</TableTitle>
        </div>
        <div className={clsx(classNames.cols.contributors, "hidden lg:flex justify-center")}>
          <TableTitle>Last 30Days</TableTitle>
        </div>
      </div>
    </div>
  );
};

export default ContributorListTableHeaders;
