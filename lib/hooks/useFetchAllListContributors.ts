import { useState } from "react";
import useSWR, { Fetcher, SWRConfiguration } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbListContributor[];
  readonly meta: Meta;
}

type QueryObj = {
  workspaceId: string;
  listId: string;
  location?: string;
  pr_velocity?: string;
  timezone?: string;
  initialLimit?: number;
  contributor?: string;
};

const useFetchAllListContributors = (query: QueryObj, config?: SWRConfiguration, makeRequest = true) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(query.initialLimit ?? 10);

  const urlQuery = new URLSearchParams();

  if (page) {
    urlQuery.set("page", `${page}`);
  }
  if (query.location) {
    urlQuery.set("location", `${query.location}`);
  }
  if (query.pr_velocity) {
    urlQuery.set("pr_velocity", `${query.pr_velocity}`);
  }
  if (query.timezone) {
    urlQuery.set("timezone", `${query.timezone}`);
  }
  if (query.contributor) {
    urlQuery.set("contributor", `${query.contributor}`);
  }
  if (limit) {
    urlQuery.set("limit", `${limit}`);
  }

  const baseEndpoint = `workspaces/${query.workspaceId}/userLists/${query.listId}/contributors`;
  const endpointString = `${baseEndpoint}?${urlQuery}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    makeRequest ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>,
    config
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data && makeRequest,
    isError: !!error,
    mutate,
    page,
    setPage,
    setLimit,
  };
};

export default useFetchAllListContributors;
