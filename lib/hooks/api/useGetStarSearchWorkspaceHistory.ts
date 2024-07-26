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

type Mutation = ReturnType<typeof useSWR<PaginatedResponse, Error>>["mutate"];

export const useGetStarSearchWorkspaceHistory = ({
  workspaceId,
  limit = 30,
}: {
  workspaceId: string | undefined;
  limit?: number;
}) => {
  // Contains the mutate functions for each page of data
  const [mutations, setMutations] = useState<Mutation[]>([]);
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
    setHistory([]);
  }, [workspaceId]);

  /**
   * When the page changes, we need to add the new mutate function to the list of mutations
   * so that we can call all of them and ensure that the history is up to date since we're
   * concatenating the data from each page.
   */
  useEffect(() => {
    if (page === 1) {
      setMutations([mutate]);
    } else {
      setMutations((prevMutations) => [...prevMutations, mutate]);
    }
  }, [page]);

  useEffect(() => {
    if (data) {
      setHistory((prevHistory) => [...prevHistory, ...data.data]);
    }
  }, [data]);

  return {
    data: history,
    isLoading: !error && !data,
    isError: !!error,
    mutate: async () => {
      // Calls all the mutate functions to ensure that the SWR cache is up to date
      const updates = await Promise.all(mutations.map((mutate) => mutate()));

      setHistory((prev) => {
        // Update the StarSearch thread history with the freshly cached SWR data.
        return updates.reduce(
          (acc, update) => {
            const historyUpdate = update?.data;

            if (historyUpdate) {
              // mutating so as to avoid generating a new array reference
              acc.push(...historyUpdate);
            }

            return acc;
          },
          [] as PaginatedResponse["data"]
        );
      });
    },
    loadMore: data?.meta.hasNextPage ? () => setPage(page + 1) : undefined,
  };
};
