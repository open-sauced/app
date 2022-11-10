import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface PaginatedInsightsResponse {
  readonly data: DbUserInsight[];
  readonly meta: Meta;
}

const useUserInsights = () => {
  const baseEndpoint = "user/insights";
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<PaginatedInsightsResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedInsightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export default useUserInsights;
