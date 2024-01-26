import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export interface PaginatedInsightsResponse {
  readonly data: DbUserInsight[];
  readonly meta: Meta;
}

interface InsightQuery extends Query {
  fetch: boolean;
}
const useUserInsights = ({ limit = 10, fetch = true, page }: InsightQuery) => {
  const query = new URLSearchParams();

  query.append("page", `${page}`);
  query.append("limit", `${limit}`);

  const baseEndpoint = "user/insights";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<PaginatedInsightsResponse, Error>(
    fetch ? endpointString : null,
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

export default useUserInsights;
