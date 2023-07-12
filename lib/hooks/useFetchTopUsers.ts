import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface TopUsersResponse {
  data: { login: string }[];
}

const useFetchTopUsers = (limit: number) => {
  const { data, error, mutate } = useSWR<TopUsersResponse, Error>(
    limit ? `users/top?limit=${limit}` : null,
    publicApiFetcher as Fetcher<TopUsersResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useFetchTopUsers };
