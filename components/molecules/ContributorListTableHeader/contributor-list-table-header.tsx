import clsx from "clsx";
import React from "react";
import { useRouter } from "next/router";
import TableTitle from "components/atoms/TableTitle/table-title";
import { classNames } from "components/organisms/RepositoriesTable/repositories-table";
import Checkbox from "components/atoms/Checkbox/checkbox";

interface ContributorListTableHeadersProps {
  selected?: boolean;
  handleOnSelectAllContributor?: (checked: boolean) => void;
  showOSCR?: boolean;
}

const ContributorListTableHeaders = ({
  selected,
  handleOnSelectAllContributor,
  showOSCR = false,
}: ContributorListTableHeadersProps) => {
  const router = useRouter();
  const { range } = router.query;

  return (
    <div className="mt-4">
      {/* Mobile */}
      <div className="flex justify-between gap-2 px-2 py-4 rounded-t-lg md:hidden bg-light-slate-3">
        {handleOnSelectAllContributor && (
          <Checkbox
            onCheckedChange={handleOnSelectAllContributor}
            className={`${"border-orange-500 hover:bg-orange-600"}`}
          />
        )}
        <div className="w-[50%]">
          <TableTitle>Contributor</TableTitle>
        </div>
        <div className="flex-1 w-[42%]">
          <TableTitle>Last Contributed </TableTitle>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden gap-6 px-6 py-4 border rounded-t-lg md:flex bg-light-slate-3">
        {handleOnSelectAllContributor && (
          <Checkbox
            onCheckedChange={handleOnSelectAllContributor}
            className={`${"border-orange-500 hover:bg-orange-600"}`}
          />
        )}
        <div className={clsx("flex-1 lg:min-w-[12.5rem]  flex justify-center")}>
          <TableTitle>Contributor</TableTitle>
        </div>

        {showOSCR ? (
          <div className={clsx("flex-1 lg:flex justify-center lg:max-w-[5rem]")}>
            <TableTitle>Rating</TableTitle>
          </div>
        ) : null}

        <div className={clsx("flex-1 hidden lg:max-w-[6.25rem]  ")}>
          <TableTitle>Repositories</TableTitle>
        </div>
        <div className={clsx("flex-1 lg:max-w-[8.1rem]  ")}>
          <TableTitle>Last Contributed</TableTitle>
        </div>
        <div className={clsx("hidden lg:flex flex-1 justify-center lg:max-w-[7.5rem]")}>
          <TableTitle>Most Used Languages</TableTitle>
        </div>

        <div className={clsx("flex-1 hidden lg:flex lg:max-w-fit")}>
          <TableTitle>Contributions</TableTitle>
        </div>
        <div className={clsx(classNames.cols.contributors, "hidden lg:flex justify-center")}>
          <TableTitle>{`Last ${range ?? 30} Days`}</TableTitle>
        </div>
      </div>
    </div>
  );
};

export default ContributorListTableHeaders;
