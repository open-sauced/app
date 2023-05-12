import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

const useFetchRecommendedRepoByRepoName = (owner: string, repo: string) => {
  const { data, error, mutate } = useSWR<DbRepo, Error>(
    `repos/${owner}/${repo}`,
    publicApiFetcher as Fetcher<DbRepo, Error>
  );

  return {
    data: data ?? undefined,
    isLoading: !data && !error,
    isError: !!error,
  };
};

export default useFetchRecommendedRepoByRepoName;
