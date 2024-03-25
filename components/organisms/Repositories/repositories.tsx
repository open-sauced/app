import { ComponentProps, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

import TableTitle from "components/atoms/TableTitle/table-title";
import Pagination from "components/molecules/Pagination/pagination";
import PaginationResults from "components/molecules/PaginationResults/pagination-result";
import TableHeader from "components/molecules/TableHeader/table-header";

import useRepositories from "lib/hooks/api/useRepositories";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { setQueryParams } from "lib/utils/query-params";

import Checkbox from "components/atoms/Checkbox/checkbox";
import Button from "components/shared/Button/button";
import LimitSelect from "components/atoms/Select/limit-select";
import { useMediaQuery } from "lib/hooks/useMediaQuery";
import RepositoriesTable, { classNames, RepositoriesRows } from "../RepositoriesTable/repositories-table";
import RepoNotIndexed from "./repository-not-indexed";

interface RepositoriesProps {
  repositories?: number[];
  showSearch?: boolean;
}

export default function Repositories({ repositories, showSearch = true }: RepositoriesProps) {
  const { user, signIn } = useSupabaseAuth();
  const router = useRouter();
  const { pageId, toolName, selectedFilter, userOrg, range = 30, limit = 10 } = router.query;
  const username = userOrg ? user?.user_metadata.user_name : undefined;
  const topic = pageId as string;

  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    data: repoListData,
    meta: repoMeta,
    isError: repoListIsError,
    isLoading: repoListIsLoading,
    setPage,
  } = useRepositories(repositories, Number(range), Number(limit));
  const filteredRepoNotIndexed = selectedFilter && !repoListIsLoading && !repoListIsError && repoListData.length === 0;
  const [selectedRepos, setSelectedRepos] = useState<DbRepo[]>([]);

  const handleOnSelectAllChecked = (state: boolean) => {
    if (state) {
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
      const reposIds = selectedRepos.map((repo) => repo.id);
      signIn({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/hub/insights/new?selectedReposIDs=${JSON.stringify(
            reposIds
          )}&login=true&`,
        },
      });
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
    if (selectedFilter && !search) {
      return router.push(`/${topic}/${toolName}`);
    }
    if (search && /^[a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-\.]+$/.test(search)) {
      return router.push(`/${topic}/${toolName}/filter/${search}`);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, setPage]);

  const onSearch: ComponentProps<typeof TableHeader>["onSearch"] = showSearch
    ? (search) => handleOnSearch(search)
    : undefined;

  return (
    <div className="flex flex-col w-full gap-4">
      <TableHeader onSearch={onSearch} metaInfo={repoMeta} entity="repos" title="Repositories" />
      <div className="flex flex-col w-full overflow-x-auto border rounded-lg">
        <div>
          <div className="flex justify-between gap-2 px-6 py-4 md:hidden bg-light-slate-3">
            <div className="flex-1">
              <TableTitle> Repository </TableTitle>
            </div>
            <div className="flex-1">
              <TableTitle> Pr Overview </TableTitle>
            </div>
          </div>
          <div className="hidden gap-2 px-6 py-4 md:flex bg-light-slate-3">
            <div className={clsx(classNames.cols.checkbox)}>
              <Checkbox
                onCheckedChange={handleOnSelectAllChecked}
                className={`${user && "border-orange-500 hover:bg-orange-600"}`}
              />
            </div>
            <div className={clsx(classNames.cols.repository)}>
              <TableTitle> Repository </TableTitle>
            </div>
            <div className={clsx(classNames.cols.activity)}>
              <TableTitle>Activity</TableTitle>
            </div>
            <div className={clsx(classNames.cols.prOverview)}>
              <TableTitle>PR Overview</TableTitle>
            </div>
            <div className={clsx(classNames.cols.prVelocity)}>
              <TableTitle>PR Velocity</TableTitle>
            </div>
            <div className={clsx(classNames.cols.spam)}>
              <TableTitle>SPAM</TableTitle>
            </div>
            <div className={clsx(classNames.cols.contributors, "hidden xl:flex")}>
              <TableTitle>Contributors</TableTitle>
            </div>
            <div className={clsx(classNames.cols.last30days, "hidden xl:flex")}>
              <TableTitle>Last {range} Days</TableTitle>
            </div>
          </div>

          {selectedRepos.length > 0 && (
            <div className="flex justify-between p-3 px-6 items-center border-b-2 text-light-slate-11">
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
          <div className="flex flex-col w-full px-4 mt-5 gap-y-3 md:flex-row">
            <LimitSelect
              placeholder="10 per page"
              options={[
                { name: "10 per page", value: "10" },
                { name: "20 per page", value: "20" },
                { name: "30 per page", value: "30" },
                { name: "40 per page", value: "40" },
                { name: "50 per page", value: "50" },
              ]}
              className="!w-36 ml-auto md:hidden overflow-x-hidden"
              onChange={function (limit: string): void {
                setQueryParams({ limit });
              }}
            />
            <div className="flex items-center justify-between w-full py-1 md:py-4 md:mt-5">
              <div>
                <div>
                  <PaginationResults metaInfo={repoMeta} total={repoMeta.itemCount} entity={"repos"} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <Pagination
                    pages={isMobile ? [] : new Array(repoMeta.pageCount).fill(0).map((_, index) => index + 1)}
                    pageSize={5}
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
}
