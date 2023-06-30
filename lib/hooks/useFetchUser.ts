import useSWR, { Fetcher, SWRConfiguration } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface UserResponse extends DbUser {}
const useFetchUser = (username: string, config?: SWRConfiguration) => {
  const { data, error } = useSWR<UserResponse, Error>(
    username ? `users/${username}` : null,
    publicApiFetcher as Fetcher<UserResponse, Error>,
    config
  );

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchUser };
