import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import Select from "components/atoms/Select/custom-select";
import TableTitle from "components/atoms/TableTitle/table-title";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";

import { useRepositoriesList } from "lib/hooks/useRepositoriesList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import RepositoriesTable, { classNames, RepositoriesRows } from "../RepositoriesTable/repositories-table";
import RepoNotIndexed from "./repository-not-indexed";
import Checkbox from "components/atoms/Checkbox/checkbox";
import Button from "components/atoms/Button/button";
import useStore from "lib/store";
import { SortOptions } from "components/molecules/SortedBySelector/sorted-by-selector";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface RepositoriesProps {
  repositories?: number[];
}

type sortDirectionType = "ASC" | "DESC";

const Repositories = ({ repositories }: RepositoriesProps): JSX.Element => {
  const { user, signIn } = useSupabaseAuth();
  const router = useRouter();
  const { filterName, toolName, selectedFilter, userOrg } = router.query;
  const username = userOrg ? user?.user_metadata.user_name : undefined;
  const topic = filterName as string;
  const store = useStore();
  const range = useStore((state) => state.range);
  const sortBy = useStore((state) => state.repositoriesSortBy);
  // const [sortBy, setSortBy] = useState<SortOptions>("");
  const [sortDirection, setSortDirection] = useState<sortDirectionType>("DESC");
  const {
    data: repoListData,
    meta: repoMeta,
    isError: repoListIsError,
    isLoading: repoListIsLoading,
    page,
    setPage,
    setLimit
  } = useRepositoriesList(false, repositories, sortBy, sortDirection);
  const filteredRepoNotIndexed = selectedFilter && !repoListIsLoading && !repoListIsError && repoListData.length === 0;
  const [selectedRepos, setSelectedRepos] = useState<DbRepo[]>([]);

  // handle on cancel sortBy: set direction to DESC
  useEffect( () => {
    if(!sortBy) setSortDirection("DESC");
  }, [sortBy]);

  const handleOnSelectAllChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRepos(repoListData);
    } else {
      setSelectedRepos([]);
    }
  };

  const handleOnAddtoInsights = () => {
    if (user) {
      router.push(
        { pathname: "/hub/insights/new", query: { selectedRepos: JSON.stringify(selectedRepos) } },
        "/hub/insights/new"
      );
    } else {
      signIn({ provider: "github" });
    }
  };

  const handleOnSelectRepo = (repo: RepositoriesRows) => {
    const matchingRepo = repoListData.find((iteratedRepo) => iteratedRepo.id === repo.id);
    if (!matchingRepo) return;

    if (selectedRepos.find((r) => r.id === matchingRepo.id)) {
      setSelectedRepos(selectedRepos.filter((r) => r.id !== repo.id));
    } else {
      setSelectedRepos([...selectedRepos, matchingRepo]);
    }
  };

  const handleOnSearch = (search?: string) => {
    if (search && /^[a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-\.]+$/.test(search)) {
      router.push(`/${topic}/${toolName}/filter/${search}`);
    } else {
      router.push(`/${topic}/${toolName}`);
    }
  };

  const handleSortByColumn = (column: SortOptions) => {
    // debugger
    // const url = router.asPath;
    // const query = router.asPath.split("?")[1];
    // const params = new URLSearchParams(query)
    // params.delete("sortedBy")
    // params.set("sortBy", column)
    // router.push({ pathname: url, query: params.toString() }, undefined, { shallow: true});
    if(sortBy === column) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortDirection("DESC");
    }
    store.updateRepositoriesSortBy(column);

  };

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, setPage]);

  const renderArrow = () => {
    return sortDirection === "ASC" ? <FaArrowUp className="text-light-slate-11 ml-2" fontSize={16} />
      : <FaArrowDown className="text-light-slate-11 ml-2" fontSize={16} />;
  };

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
      <div className="flex flex-col rounded-lg overflow-x-auto border w-full">
        <div className="lg:min-w-[1150px]">
          <div className="flex md:hidden justify-between  py-4 px-6 bg-light-slate-3 gap-2">
            <div className="flex-1">
              <TableTitle text="Repository"></TableTitle>
            </div>
            <div className="flex-1">
              <TableTitle text="Pr Overview"></TableTitle>
            </div>
          </div>
          <div className="hidden md:flex py-4 px-6 bg-light-slate-3 gap-2">
            <div className={clsx(classNames.cols.checkbox)}>
              <Checkbox
                label=""
                onChange={handleOnSelectAllChecked}
                disabled={!user}
                title={!user ? "Connect to GitHub" : ""}
                className={`checked:[&>*]:!bg-orange-500 ${
                  user ? "[&>*]:!border-orange-500 [&>*]:hover:!bg-orange-600" : "[&>*]:!border-light-slate-8"
                }`}
              />
            </div>
            <div className={clsx(classNames.cols.repository, "flex items-center cursor-pointer")} onClick={() => handleSortByColumn("name")}>
              <TableTitle text="Repository"></TableTitle>
              {sortBy == "name" && renderArrow()}
            </div>
            <div className={clsx(classNames.cols.activity, "flex items-center")}>
              <TableTitle text="Activity"></TableTitle>
            </div>
            <div className={clsx(classNames.cols.prOverview, "flex items-center")}>
              <TableTitle text="PR Overview"></TableTitle>
            </div>
            <div className={clsx(classNames.cols.prVelocity, "flex items-center")}>
              <TableTitle text="PR Velocity"></TableTitle>
            </div>
            <div className={clsx(classNames.cols.spam, "flex items-center")}>
              <TableTitle text="SPAM"></TableTitle>
            </div>
            <div className={clsx(classNames.cols.contributors, "hidden lg:flex", "flex items-center")}>
              <TableTitle text="Contributors"></TableTitle>
            </div>
            <div className={clsx(classNames.cols.last30days, "hidden lg:flex", "flex items-center")}>
              <TableTitle text="Last 30 Days"></TableTitle>
            </div>
          </div>

          {selectedRepos.length > 0 && (
            <div className="p-3 px-6 border-b-2 text-light-slate-11 flex justify-between">
              <div>{selectedRepos.length} Repositories selected</div>
              <Button onClick={handleOnAddtoInsights} variant="primary">
                Add to Insight Page
              </Button>
            </div>
          )}

          <RepositoriesTable
            topic={topic}
            error={repoListIsError}
            loading={repoListIsLoading}
            listOfRepositories={repoListData}
            user={username}
            repo={selectedFilter}
            selectedRepos={selectedRepos}
            handleOnSelectRepo={handleOnSelectRepo}
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
              className="!w-36 ml-auto md:hidden overflow-x-hidden"
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
                    divisor={true}
                    goToPage
                  />
                </div>
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
