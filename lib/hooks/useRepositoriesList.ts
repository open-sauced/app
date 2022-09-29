import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = () => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const filter = selectedFilter as string;  

  const [page, setPage] = useState(1);
  const baseEndpoint = `${topic}/repos`;
  const pageQuery = page ? `page=${page}` : ``;
  const filterQuery = filter ? `&filter=${filter}` : ``;
  const endpointString = `${baseEndpoint}?${pageQuery}${filterQuery}`;
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>(topic ? endpointString : null);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    page,
    setPage
  };
};

export { useRepositoriesList };
