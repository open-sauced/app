import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedResponse {
  readonly data: DbUserContributor[];
  readonly meta: Meta;
}

/**
 * Fetch contributors based on pull requests.
 *
 * @param intialLimit
 * @param repoIds
 * @param range
 * @returns
 */
const useContributors = (limit = 10, repoIds: number[] = []) => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { pageId, selectedFilter, range } = router.query;
  const topic = pageId as string;
  const filterQuery = getFilterQuery(selectedFilter);
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic)) && topic !== undefined) {
    query.set("topic", topic);
  }

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repoIds?.length > 0) {
    query.delete("topic");
    query.set("repoIds", repoIds.join(","));
  }

  if (query.get("repo")) {
    query.delete("topic");
    query.set("repos", query.get("repo")!);
  }

  query.set("range", `${range ?? 30}`);

  const baseEndpoint = "contributors/search";
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  const makeRequest = query.get("topic") || query.get("repos") || repoIds?.length > 0;

  const { data, error, mutate, isLoading } = useSWR<PaginatedResponse, Error>(
    makeRequest ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>,
    {
      keepPreviousData: true,
    }
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: isLoading || (!error && !data),
    isError: !!error,
    mutate,
    page,
    setPage,
  };
};

export default useContributors;
