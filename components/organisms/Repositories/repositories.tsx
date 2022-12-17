import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import Select from "components/atoms/Select/custom-select";
import TableTitle from "components/atoms/TableTitle/table-title";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";

import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import RepositoriesTable, { classNames } from "../RepositoriesTable/repositories-table";
import RepoNotIndexed from "./repository-not-indexed";
import useStore from "lib/store";
import useFilterRepos from "lib/hooks/useFilterRepos";

interface RepositoriesProps {
  repositories?: number[];
}

const renderArrow = (order: string) => {
  return order === "ASC" ? <FaArrowUp className="text-light-slate-11 ml-2" fontSize={16} />
    : <FaArrowDown className="text-light-slate-11 ml-2" fontSize={16} />;
};

type FilterOptions = keyof DbRepo;

const Repositories = ({ repositories }: RepositoriesProps): JSX.Element => {
  const [orderBy, setOrderBy] = useState<FilterOptions>("name");
  const [orderDirection, setOrderDirection] = useState("");
  const { user } = useSupabaseAuth();
  const router = useRouter();
  const { filterName, toolName, selectedFilter, userOrg } = router.query;
  const username = userOrg ? user?.user_metadata.user_name : undefined;
  const topic = filterName as string;
  const store = useStore();
  const range = useStore(state => state.range);
  const {
    data: repoListData,
    meta: repoMeta,
    isError: repoListIsError,
    isLoading: repoListIsLoading,
    page,
    setPage,
    setLimit
  } = useRepositoriesList(false, repositories);
  const filteredRepoNotIndexed = selectedFilter && !repoListIsLoading && !repoListIsError && repoListData.length === 0;

  const { filteredRepos } = useFilterRepos(orderBy, orderDirection, repoListData);

  const toggleFilter = (filter: FilterOptions) => {
    setOrderBy(filter);
    setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC" );
    router.push(`/${topic}/${toolName}/filter/${selectedFilter}?sort=${orderDirection === "ASC" ? "DESC" : "ASC"}`);
  };

  const handleOnSearch = (search?: string) => {
    if (search && /^[a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-\.]+$/.test(search)) {
      router.push(`/${topic}/${toolName}/filter/${search}`);
    } else {
      router.push(`/${topic}/${toolName}`);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, setPage]);

  return (
    <div className="flex flex-col w-full gap-4">
      <TableHeader
        updateLimit={setLimit}
        onSearch={(e) => handleOnSearch(e)}
        showing={{
          from: page === 1 ? (repoMeta.itemCount > 0 ? page : 0) : (page - 1) * repoMeta.limit + 1,
          to: page * repoMeta.limit <= repoMeta.itemCount ? page * repoMeta.limit : repoMeta.itemCount,
          total: repoMeta.itemCount,
          entity: "Repositories"
        }}
        range={range}
        setRangeFilter={store.updateRange}
        title="Repositories"
      />
      <div className="flex flex-col rounded-lg overflow-hidden border">
        <div className="flex md:hidden justify-between  py-4 px-6 bg-light-slate-3 gap-2">
          <div className="flex-1" >
            <TableTitle text="Repository" />
          </div>
          <div className="flex-1">
            <TableTitle text="Pr Overview"></TableTitle>
          </div>
        </div>
        <div className="hidden md:flex py-4 px-6 bg-light-slate-3 gap-2">
          <div className={clsx(classNames.cols.repository, "flex items-center cursor-pointer")}  onClick={() => toggleFilter("name")}>
            <TableTitle text="Repository"></TableTitle>
            {orderBy === "name" ? renderArrow(orderDirection) : null }
          </div>
          <div className={clsx(classNames.cols.activity)}>
            <TableTitle text="Activity"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.prOverview, "flex items-center cursor-pointer")} onClick={() => toggleFilter("mergedPrsCount")}>
            <TableTitle text="PR Overview"></TableTitle>
            {orderBy === "mergedPrsCount" ? renderArrow(orderDirection) : null}
          </div>
          <div className={clsx(classNames.cols.prVelocity, "flex items-center cursor-pointer")} onClick={() => toggleFilter("prVelocityCount")}>
            <TableTitle text="PR Velocity"></TableTitle>
            {orderBy === "prVelocityCount" ? renderArrow(orderDirection) : null}
          </div>
          <div className={clsx(classNames.cols.spam, "flex items-center cursor-pointer")} onClick={() => toggleFilter("spamPrsCount")}>
            <TableTitle text="SPAM"></TableTitle>
            {orderBy === "spamPrsCount" ? renderArrow(orderDirection) : null}
          </div>
          <div className={clsx(classNames.cols.contributors, "hidden lg:flex")}>
            <TableTitle text="Contributors"></TableTitle>
          </div>
          <div className={clsx(classNames.cols.last30days, "hidden lg:flex")}>
            <TableTitle text="Last 30 Days"></TableTitle>
          </div>
        </div>

        <RepositoriesTable
          topic={topic}
          error={repoListIsError}
          loading={repoListIsLoading}
          listOfRepositories={filteredRepos}
          user={username}
          repo={selectedFilter}
        />

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
                  from={page === 1 ? (repoMeta.itemCount > 0 ? page : 0) : (page - 1) * repoMeta.limit + 1}
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

      {filteredRepoNotIndexed && <RepoNotIndexed />}
    </div>
  );
};

export default Repositories;
