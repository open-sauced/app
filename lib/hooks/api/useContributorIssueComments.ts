import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export interface PaginatedResponse {
  readonly data: DbIssueComment[];
  readonly meta: Meta;
}

export function getContributorIssueCommentsUrl(contributor: string, repos: string[] = [], limit = 8, range = 30) {
  const query = new URLSearchParams();

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repos?.length > 0) {
    query.set("repos", repos.join(","));
  }

  query.set("range", `${range}`);

  const baseEndpoint = `users/${contributor}/issue-comments`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;
  return endpointString;
}

export const fetchContributorPRs = async (...args: Parameters<typeof getContributorIssueCommentsUrl>) => {
  return (publicApiFetcher as Fetcher<PaginatedResponse, string>)(getContributorIssueCommentsUrl(...args));
};

interface ContributorIssueCommentsOptions {
  contributor: string;
  repos?: string[];
  limit?: number;
  range?: number;
}

const useContributorIssueComments = (
  options: ContributorIssueCommentsOptions = {
    contributor: "",
    limit: 8,
    range: 30,
  }
) => {
  const { contributor, repos, limit, range } = options;
  const endpointString = getContributorIssueCommentsUrl(contributor, repos, limit, range);

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

export default useContributorIssueComments;
