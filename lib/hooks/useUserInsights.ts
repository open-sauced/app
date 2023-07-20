import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedInsightsResponse {
  readonly data: DbUserInsight[];
  readonly meta: Meta;
}

const useUserInsights = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pageQuery = page ? `page=${page}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";

  const baseEndpoint = "user/insights";
  const endpointString = `${baseEndpoint}?${pageQuery}${limitQuery}`;

  const { data, error, mutate } = useSWR<PaginatedInsightsResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedInsightsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
    page,
    setPage,
    setLimit,
  };
};

export default useUserInsights;
