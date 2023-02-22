import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbRepoPR[];
  readonly meta: Meta;
}

const usePullRequests = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const pageQuery = page ? `page=${page}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";
  const baseEndpoint = "prs/list";
  const endpointString = `${baseEndpoint}?${pageQuery}${limitQuery}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    page,
    setPage,
    setLimit
  };
};

export default usePullRequests;
