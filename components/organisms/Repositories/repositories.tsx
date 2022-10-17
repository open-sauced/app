import clsx from "clsx";
import Select from "components/atoms/Select/custom-select";
import TableTitle from "components/atoms/TableTitle/table-title";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";
import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import RepositoriesTable, { classNames } from "../RepositoriesTable/repositories-table";

const Repositories = (): JSX.Element => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const {
    data: repoListData,
    meta: repoMeta,
    isError: repoListIsError,
    isLoading: repoListIsLoading,
    page,
    setPage,
    setLimit
  } = useRepositoriesList();

  useEffect(() => {
    setPage(1);
  }, [selectedFilter]);

  return (
    <div className="flex flex-col w-full gap-4">
      <TableHeader
        updateLimit={setLimit}
        showing={{
          from: page === 1 ? page : ((page-1) * repoMeta.limit) + 1,
          to: page * repoMeta.limit <= repoMeta.itemCount ? page * repoMeta.limit : repoMeta.itemCount,
          total: repoMeta.itemCount,
          entity: "Repositories"
        }}
        title="Repositories"
      />
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
          <div className={clsx(classNames.cols.last30days, "hidden lg:flex")}>
            <TableTitle text="Last 30 Days"></TableTitle>
          </div>
        </div>

        <RepositoriesTable topic={topic} error={repoListIsError} loading={repoListIsLoading} listOfRepositories={repoListData} />

        {/* Table Footer */}
        <div className="mt-5 w-full px-4 flex flex-col gap-y-3 md:flex-row">
          <Select
            placeholder="10 per page"
            options={[
              { name: "10 per page", value: 10 },
              { name: "20 per page", value: 20 },
              { name: "30 per page", value: 30 },
              { name: "40 per page", value: 40 },
              { name: "50 per page", value: 50 }
            ]}
            className="!w-36 ml-auto md:hidden overflow-x-hidden "
            onChange={function (limit: number): void {
              setLimit(limit);
            }}
          ></Select>
          <div className="py-1 md:py-4 flex w-full md:mt-5 justify-between items-center">
            <div>
              <div className="">
                <PaginationResults
                  from={page === 1 ? page : ((page-1) * repoMeta.limit) + 1}
                  to={page * repoMeta.limit <= repoMeta.itemCount ? page * repoMeta.limit : repoMeta.itemCount}
                  total={repoMeta.itemCount}
                  entity={"repos"}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <Pagination
                  pages={[]}
                  hasNextPage={repoMeta.hasNextPage}
                  hasPreviousPage={repoMeta.hasPreviousPage}
                  totalPage={repoMeta.pageCount}
                  page={repoMeta.page}
                  onPageChange={function (page: number): void {
                    setPage(page);
                  }}
                  divisor={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repositories;
