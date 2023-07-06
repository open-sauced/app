import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

export interface PaginatedResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

export function getContributorPRUrl(
  contributor: string,
  filter: string | string[] | undefined,
  topic: string,
  repoIds: number[] = [],
  limit = 8,
  range = 30
) {
  const filterQuery = getFilterQuery(filter);
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic)) && topic !== "*") {
    query.set("topic", topic);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repoIds?.length > 0) {
    query.set("repoIds", repoIds.join(","));
  }

  query.set("range", `${range}`);

  const baseEndpoint = `users/${contributor}/prs`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  return endpointString;
}

export const fetchContributorPRs = async (...args: Parameters<typeof getContributorPRUrl>) => {
  return (publicApiFetcher as Fetcher<PaginatedResponse, string>)(
    getContributorPRUrl(...args)
  );
};

const useContributorPullRequests = (
  contributor: string,
  topic: string,
  repoIds: number[] = [],
  limit = 8,
  range = 30
) => {
  const router = useRouter();
  const { selectedFilter } = router.query;
  const endpointString = getContributorPRUrl(contributor, selectedFilter, topic, repoIds, limit, range);

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    contributor ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useContributorPullRequests;
