import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DBRepo[];
  readonly meta: Meta;
}

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>("repos/list");

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoriesList};
