import useSWR, { Fetcher } from "swr";
import { useEffect, useState } from "react";
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
  limit = 30,
}: {
  workspaceId: string | undefined;
  limit?: number;
}) => {
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<StarSearchHistoryItem[]>([]);
  const baseEndpoint = `workspaces/${workspaceId}/star-search`;
  const query = new URLSearchParams();

  query.set("limit", `${limit}`);
  query.set("page", `${page}`);

  const { data, error, mutate, isLoading } = useSWR<PaginatedResponse, Error>(
    `${baseEndpoint}?${query}`,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  useEffect(() => {
    if (data) {
      setHistory((prevHistory) => [...prevHistory, ...data.data]);
    }
  }, [data]);

  return {
    data: history,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    loadMore: data?.meta.hasNextPage ? () => setPage(page + 1) : undefined,
  };
};
