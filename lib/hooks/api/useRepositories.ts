import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositories = (repoIds: number[] = [], range = 30) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (topic && Number.isNaN(Number(topic))) {
    query.set("topic", topic);
  }

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (range) {
    query.set("range", `${range}`);
  }  

  if (repoIds?.length > 0) {
    query.set("repoIds", repoIds.join(","));
  }

  const baseEndpoint = "repos/search";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

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

export default useRepositories;
