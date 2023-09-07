import useSWR, { Fetcher, SWRConfiguration } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

type UsersSearchResponse = DbUserSearch[];

const useSearchUsers = (username: string, config?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<UsersSearchResponse, Error>(
    username ? `users/search/${username}` : null,
    publicApiFetcher as Fetcher<UsersSearchResponse, Error>,
    config
  );

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useSearchUsers };
