import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import publicApiFetcher from "lib/utils/public-api-fetcher";

type TopContributorsResponse = {
  data: { login: string }[];
  meta: Meta;
};

const defaultOptions = {
  limit: 10,
};

const useFetchTopContributors = (options: typeof defaultOptions) => {
  const { limit } = { ...defaultOptions, ...options };
  const [page, setPage] = useState(1);

  const pageQuery = page ? `page=${page}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";

  const { data, error, mutate } = useSWR<TopContributorsResponse, Error>(
    `users/top?${pageQuery}${limitQuery}`,
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
