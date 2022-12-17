import { useEffect, useState } from "react";

type FilterOptions = keyof DbRepo | "prsCount" | null

const useFilterRepos = (filterName: FilterOptions, orderDirection: string, repos: DbRepo[]) => {
  const [filteredRepos, setFilteredRepos] = useState<DbRepo[]>(repos ?? []);

  useEffect(() => {
    if (repos.length > 0 && filterName) {
      const sortedRepos = repos.sort((a, b) => {
        if (filterName === "prsCount") {
          if (isDbRepo(a) && isDbRepo(b)) {
            return getTotalPrs(a.openPrsCount, a.mergedPrsCount, a.closedPrsCount, a.draftPrsCount) - getTotalPrs(b.openPrsCount, b.mergedPrsCount, b.closedPrsCount, b.draftPrsCount);
          }
        }

        if(isKeyofDbRepo(filterName)) {
          if (typeof a[filterName] === "string") {
            return (a[filterName] as string).localeCompare(b[filterName] as string);
          } else {
            return (a[filterName] as number) - (b[filterName] as number);
          }
        }

        return 0;
      });

      if (orderDirection === "ASC") {
        sortedRepos.reverse();
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

function isKeyofDbRepo(filter: any): filter is keyof DbRepo {
  return (filter as DbRepo).owner !== undefined;
}
