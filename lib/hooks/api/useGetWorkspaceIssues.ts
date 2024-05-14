import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbRepoIssueEvents[];
  readonly meta: Meta;
}

export type OrderIssuesBy = "created_at" | "closed_at" | "updated_at" | "reactions_heart";

export const useGetWorkspaceIssues = ({
  workspaceId,
  page,
  limit,
  orderDirection,
  orderBy,
  repoIds,
  range,
}: {
  workspaceId: string;
  page: number;
  limit: number;
  orderDirection?: "ASC" | "DESC";
  orderBy?: OrderIssuesBy;
  repoIds?: number[];
  range: number;
}) => {
  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (orderDirection) {
    query.set("orderDirection", orderDirection);
  }

  if (orderBy) {
    query.set("orderBy", orderBy);
  }

  if (repoIds && repoIds.length > 0) {
    query.set("repoIds", repoIds.join(","));
  }

  query.set("range", `${range}`);

  const endpointString = `workspaces/${workspaceId}/repos/issues?${query}`;

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
  };
};
