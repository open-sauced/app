import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

type TopUsersResponse = { login: string }[];

const useFetchTopUsers = () => {
  const { data, error, mutate } = useSWR<TopUsersResponse, Error>(
    "users/top",
    publicApiFetcher as Fetcher<TopUsersResponse, Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useFetchTopUsers };
