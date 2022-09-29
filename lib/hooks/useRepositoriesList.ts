import { useState } from "react";
import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(`repos/list?page=${page}&limit=${limit}`);

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

export { useRepositoriesList };
