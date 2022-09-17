import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DbRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>("repos/list");

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0,hasNextPage: false , hasPreviousPage: false, pageCount: 0},
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoriesList};
