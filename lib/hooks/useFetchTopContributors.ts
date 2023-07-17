import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

type TopContributorsResponse = { login: string }[];

const useFetchTopContributors = () => {
  const { data, error, mutate } = useSWR<TopContributorsResponse, Error>(
    "users/top",
    publicApiFetcher as Fetcher<TopContributorsResponse, Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export { useFetchTopContributors };
