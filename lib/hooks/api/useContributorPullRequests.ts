import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { v2PublicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

export interface PaginatedResponse {
  readonly data: DbRepoPREvents[];
  readonly meta: Meta;
}

export function getContributorPRUrl(
  contributor: string,
  filter: string | string[] | undefined,
  topic: string,
  repoIds: number[] = [],
  limit = 8,
  range = "30",
  mostRecent = false
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

  if (mostRecent) {
    query.set("rangeType", "all");
  } else {
    query.set("range", `${range}`);
  }

  const baseEndpoint = `users/${contributor}/prs`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  return endpointString;
}

export const fetchContributorPRs = async (...args: Parameters<typeof getContributorPRUrl>) => {
  return (v2PublicApiFetcher as Fetcher<PaginatedResponse, string>)(getContributorPRUrl(...args));
};

interface ContributorPullRequestOptions {
  contributor: string;
  topic: string;
  repoIds?: number[];
  limit?: number;
  range?: string;
  mostRecent?: boolean;
}

const useContributorPullRequests = (
  options: ContributorPullRequestOptions = {
    contributor: "",
    topic: "",
    limit: 8,
    range: "30",
    mostRecent: false,
  }
) => {
  const { contributor, topic, repoIds, limit, range, mostRecent } = options;
  const router = useRouter();
  const { selectedFilter } = router.query;
  const endpointString = getContributorPRUrl(contributor, selectedFilter, topic, repoIds, limit, range, mostRecent);

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    contributor ? endpointString : null,
    v2PublicApiFetcher as Fetcher<PaginatedResponse, Error>
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
