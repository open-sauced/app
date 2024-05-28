import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  data: DbWorkspaceContributorInsight[];
  meta: Meta;
}

export const useWorkspacesContributorInsights = ({
  workspaceId,
  initialPage = 1,
  limit = 10,
}: {
  workspaceId: string | null;
  initialPage?: number;
  limit?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const endpointString = `workspaces/${workspaceId}/userLists?${searchParams}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    workspaceId && workspaceId !== "new" ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    page,
    setPage,
    mutate,
  };
};
