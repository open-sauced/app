import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import getFilterQuery from "lib/utils/get-filter-query";
import useStore from "lib/store";
import { SortOptions } from "components/molecules/SortedBySelector/sorted-by-selector";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = (skipFilters = false, repoIds: number[] = [], sortBy: SortOptions = "", sortDirection: "DESC" | "ASC" = "DESC") => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const range = useStore(state => state.range);

  const baseEndpoint = !skipFilters ? `${topic}/repos` : "repos/list";
  const pageQuery = page ? `page=${page}` : "";
  const filterQuery = getFilterQuery(selectedFilter);
  const limitQuery = limit ? `&limit=${limit}` : "";
  const rangeQuery = range ? `&range=${range}` : "";
  const reposQuery = repoIds.length > 0 ? `&repoIds=${repoIds.join(",")}`: "";
  const sortQuery = sortBy ? `&orderBy=${sortBy}` : "";
  const sortDirectionQuery = `&orderDirection=${sortDirection}`;
  const endpointString = `${baseEndpoint}?${pageQuery}${limitQuery}${rangeQuery}${reposQuery}${!skipFilters ? filterQuery : ""}${sortQuery}${sortDirectionQuery}`;
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(topic ? endpointString : null);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    page,
    setPage,
    setLimit
  };
};

export { useRepositoriesList };
