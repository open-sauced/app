import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: any[];
  readonly meta: Meta;
}

const useListStats = (listId: string, intialLimit = 1000, range = 30) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(intialLimit);
  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  query.set("listId", listId);
  query.set("range", `${range}`);

  const baseEndpoint = `lists/${listId}/stats/most-active-contributors?contributorType=all`;
  const endpointString = `${baseEndpoint}&${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    listId ? endpointString : null,
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
    setLimit,
  };
};

export default useListStats;
