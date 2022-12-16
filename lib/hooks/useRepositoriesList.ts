import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import getFilterQuery from "lib/utils/get-filter-query";
import useStore from "lib/store";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = (skipFilters = false, repoIds: number[] = []) => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState("stars");
  const [orderDirection, setOrderDirection] = useState("DESC");
  const range = useStore(state => state.range);
  const baseEndpoint = !skipFilters ? `${topic}/repos` : "repos/list";
  const pageQuery = page ? `page=${page}` : "";
  const filterQuery = getFilterQuery(selectedFilter);
  const orderByQuery = `&orderBy=${orderBy}`;
  const orderDirectionQuery = `&orderDirection=${orderDirection}`;
  const limitQuery = limit ? `&limit=${limit}` : "";
  const rangeQuery = range ? `&range=${range}` : "";
  const reposQuery = repoIds.length > 0 ? `&repoIds=${repoIds.join(",")}`: "";
  const endpointString = `${baseEndpoint}?${pageQuery}${limitQuery}${rangeQuery}${reposQuery}${!skipFilters ? filterQuery : ""}${orderByQuery}${orderDirectionQuery}`;
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(topic ? endpointString : null);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    page,
    orderBy,
    orderDirection,
    setPage,
    setLimit,
    setOrderBy,
    setOrderDirection
  };
};

export { useRepositoriesList };
