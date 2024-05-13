import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import getFilterQuery from "lib/utils/get-filter-query";

export interface PaginatedResponse {
  readonly data: DbRepoPREvents[];
  readonly meta: Meta;
}

export function getContributorPRUrl(
  contributor: string,
  filter: string | string[] | undefined,
  topic: string,
  repositories: string[] = [],
  limit = 8,
  range = "30"
) {
  const filterQuery = getFilterQuery(filter);
  const query = new URLSearchParams(filterQuery);

  if (Number.isNaN(Number(topic)) && topic !== "*") {
    query.set("topic", topic);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repositories?.length > 0) {
    query.set("repos", repositories.join(","));
  }

  query.set("range", `${range}`);

  const baseEndpoint = `users/${contributor}/prs`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  return endpointString;
}

export const fetchContributorPRs = async (...args: Parameters<typeof getContributorPRUrl>) => {
  return (publicApiFetcher as Fetcher<PaginatedResponse, string>)(getContributorPRUrl(...args));
};

interface ContributorPullRequestOptions {
  contributor: string;
  topic: string;
  repositories?: string[];
  limit?: number;
  range?: string;
}

const useContributorPullRequests = (
  options: ContributorPullRequestOptions = {
    contributor: "",
    topic: "",
    limit: 8,
    range: "30",
  }
) => {
  const { contributor, topic, repositories, limit, range } = options;
  const router = useRouter();
  const { selectedFilter } = router.query;
  const endpointString = getContributorPRUrl(contributor, selectedFilter, topic, repositories, limit, range);

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
