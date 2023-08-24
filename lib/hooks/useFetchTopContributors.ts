import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

type TopContributorsResponse = {
  data: { login: string }[];
  meta: Meta;
};
type TopContributorsOptions = {
  limit?: number;
  userId?: number;
};
const defaultOptions: TopContributorsOptions = {
  limit: 10,
  userId: undefined,
};

const useFetchTopContributors = (options: typeof defaultOptions) => {
  const query = new URLSearchParams();

  const { limit } = { ...defaultOptions, ...options };
  const [page, setPage] = useState(1);

  if (options.limit) {
    query.set("limit", `${options.limit}`);
  }

  if (options.userId) {
    query.set("userId", `${options.userId}`);
  }
  query.set("page", `${page}`);

  const baseEndpoint = "users/top";
  const endpointString = `${baseEndpoint}?${query}`;

  const { data, error, mutate } = useSWR<TopContributorsResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<TopContributorsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    setPage,
    mutate,
  };
};

export { useFetchTopContributors };
