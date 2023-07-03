import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface RepoRecommendationResponse {
  [name: string]: DbRepo[];
}

const useUserRepoRecommendations = () => {
  const { data, error, mutate } = useSWR<RepoRecommendationResponse, Error>(
    "user/recommendations/repos",
    publicApiFetcher as Fetcher<RepoRecommendationResponse, Error>
  );

  return {
    data: data || {},
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};

export default useUserRepoRecommendations;
