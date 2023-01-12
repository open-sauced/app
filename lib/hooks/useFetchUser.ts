import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface UserResponse extends DbUser {}
const useFetchUser = (username: string) => {
  const { data, error } = useSWR<UserResponse, Error>(
    `users/${username}`,
    publicApiFetcher as Fetcher<UserResponse, Error>
  );

  return {
    data: data || undefined,
    isLoading: !error && !data,
    isError: !!error
  };
};

export { useFetchUser };
