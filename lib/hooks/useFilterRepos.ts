import { useEffect, useState } from "react";
import dynamicSort from "lib/utils/dynamic-sort";

type FilterOptions = keyof DbRepo | "prsCount" | null

const useFilterRepos = (filterName: FilterOptions, orderDirection: string, repos: DbRepo[]) => {
  const [filteredRepos, setFilteredRepos] = useState<DbRepo[]>(repos ?? []);

  useEffect(() => {
    if (repos.length > 0 && filterName) {
      let sortedRepos: DbRepo[] = [];

      if (filterName === "prsCount") {
        sortedRepos = repos.sort((a, b) => {
          if (isDbRepo(a) && isDbRepo(b)) {
            return orderDirection === "ASC" ? getTotalPrs(a.openPrsCount, a.mergedPrsCount, a.closedPrsCount, a.draftPrsCount) - getTotalPrs(b.openPrsCount, b.mergedPrsCount, b.closedPrsCount, b.draftPrsCount) : getTotalPrs(b.openPrsCount, b.mergedPrsCount, b.closedPrsCount, b.draftPrsCount) - getTotalPrs(a.openPrsCount, a.mergedPrsCount, a.closedPrsCount, a.draftPrsCount);
          }

          return 0;
        });
      } else {
        sortedRepos = repos.sort(dynamicSort(orderDirection === "ASC" ? filterName : `-${filterName}`));
      }

      setFilteredRepos(sortedRepos);
    }
  }, [repos, filterName, orderDirection]);

  return { filteredRepos };
};

export default useFilterRepos;

const getTotalPrs = (
  openPrsCount?: number,
  mergedPrsCount?: number,
  closedPrsCount?: number,
  draftPrsCount?: number
): number => {
  const open = openPrsCount || 0;
  const merged = mergedPrsCount || 0;
  const closed = closedPrsCount || 0;
  const drafts = draftPrsCount || 0;

  const total = open + closed + merged - drafts;

  if (total <= 0) {
    return 0;
  }

  return total;
};

function isDbRepo(repo: any): repo is DbRepo {
  return (repo as DbRepo).owner !== undefined;
}
