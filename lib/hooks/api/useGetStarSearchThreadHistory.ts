import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

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
