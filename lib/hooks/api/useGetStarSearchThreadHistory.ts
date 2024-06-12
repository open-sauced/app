import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { ThreadHistoryItem } from "lib/utils/star-search-utils";

interface StarSearchThread {
  thread_history: ThreadHistoryItem[];
}

export const useGetStarSearchThreadHistory = (threadId: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<StarSearchThread, Error>(
    !threadId ? null : `star-search/${threadId}`,
    publicApiFetcher as Fetcher<StarSearchThread, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
