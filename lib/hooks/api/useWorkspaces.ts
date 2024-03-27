import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: Workspace[];
  readonly meta: Meta;
}

const useWorkspaces = ({ load = false, limit = 100 }: { load?: boolean; limit?: number }) => {
  const [page, setPage] = useState(1);
  const query = new URLSearchParams();
  query.append("page", `${page}`);
  query.append("limit", `${limit}`);

  const baseEndpoint = "workspaces";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    load ? endpointString : null,
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

export default useWorkspaces;
