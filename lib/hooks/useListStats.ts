import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbListContributorStat[];
  readonly meta: Meta;
}

const useListStats = (listId: string, contributorType = "all", startDays = 0, intialLimit = 10) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(intialLimit);
  const query = new URLSearchParams();

  query.set("page", `${page}`);
  query.set("limit", `${limit}`);
  query.set("listId", listId);
  query.set("prev_days_start_date", `${startDays}`);

  const baseEndpoint = `lists/${listId}/stats/most-active-contributors?contributorType=${contributorType}`;
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
