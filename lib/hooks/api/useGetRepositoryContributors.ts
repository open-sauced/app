import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbListContributor[];
  readonly meta: Meta;
}

export const useGetRepoContributors = ({
  repositories = [],
  limit = 1000,
  range = 90,
}: {
  repositories: string[] | undefined;
  limit?: number;
  range?: number;
}) => {
  // TODO: fallback to GitHub API `repos/${repoName}/contributors?per_page=100&page=${page}`
  const [page, setPage] = useState(1);
  const query = new URLSearchParams();
  query.append("page", `${page}`);
  query.append("limit", `${limit}`);
  query.append("range", `${range}`);

  // TODO: POC, clean this up instead of one repo for the moment.
  const repository = repositories[0];

  const endpointString = repositories && repositories.length > 0 ? `repos/${repository}/contributors?${query}` : null;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data.map(({ login }) => login) ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    page,
    setPage,
  };
};
