import { useState } from "react";
import useSWR from "swr";

type direction = "asc" | "desc";

interface PaginatedResponse {
  data: DbRecommendedInsightsRepo[];
  meta: Meta;
}

const useFetchInsightRecommendedRepositories = (range = 30, orderDirection?: direction) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (range) {
    query.set("range", `${range}`);
  }

  if (orderDirection) {
    query.set("orderDirection", `${orderDirection}`);
  }

  const baseEndpoint = "user/recommendations/orgs";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(endpointString);

  return {
    data: data?.data || [],
    isLoading: !data && !error,
    isError: !!error,
    setPage,
    setLimit,
    mutate,
  };
};

export { useFetchInsightRecommendedRepositories };
