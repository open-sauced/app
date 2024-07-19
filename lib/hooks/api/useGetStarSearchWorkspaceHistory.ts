import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export interface StarSearchHistoryItem {
  id: string;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
  deleted_at: string | null;
  public_link: string | null;
  is_publicly_viewable: boolean;
  title: string;
  thread_summary: string;
}

interface PaginatedResponse {
  readonly data: StarSearchHistoryItem[];
  readonly meta: Meta;
}

export const useGetStarSearchWorkspaceHistory = ({
  workspaceId,
  // TODO: temporarily set to 1000 to avoid pagination
  // I'll be adding TanStack Virtual Window to handle pagination
  // https://tanstack.com/virtual/v3/docs/framework/react/examples/window
  limit = 1000,
}: {
  workspaceId: string | undefined;
  limit?: number;
}) => {
  const baseEndpoint = `workspaces/${workspaceId}/star-search`;
  const query = new URLSearchParams();

  query.set("limit", `${limit}`);

  const { data, error, mutate, isLoading } = useSWR<PaginatedResponse, Error>(
    `${baseEndpoint}?${query}`,
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
