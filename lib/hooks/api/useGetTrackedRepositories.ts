import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: TrackedRepository[];
  readonly meta: Meta;
}

export const useGetTrackedRepositories = ({
  workspaceId,
  limit = 100,
}: {
  workspaceId: string | null;
  limit?: number;
}) => {
  const [page, setPage] = useState(1);
  const query = new URLSearchParams();
  query.append("page", `${page}`);
  query.append("limit", `${limit}`);

  const endpointString = workspaceId ? `workspaces/${workspaceId}/repos?${query}` : null;

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
    page,
    setPage,
  };
};
