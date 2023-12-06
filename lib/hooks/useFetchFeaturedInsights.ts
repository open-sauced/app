import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export interface PaginatedInsightsResponse {
  readonly data: DbUserInsight[];
  readonly meta: Meta;
}

const useFetchFeaturedInsights = (shouldFetch = true) => {
  const { data, error, mutate } = useSWR<PaginatedInsightsResponse, Error>(
    shouldFetch ? "insights/featured" : null,
    publicApiFetcher as Fetcher<PaginatedInsightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export default useFetchFeaturedInsights;
