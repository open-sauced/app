import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useGetStarSearchThreadHistory = (threadId: string | null, workspaceId?: string) => {
  const { data, error, isLoading, mutate } = useSWR<StarSearchThread, Error>(
    !threadId ? null : workspaceId ? `workspaces/${workspaceId}/star-search/${threadId}` : `star-search/${threadId}`,
    publicApiFetcher as Fetcher<StarSearchThread, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
