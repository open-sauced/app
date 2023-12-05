import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedListResponse {
  data: DbUserList[];
  meta: Meta;
}

const useFetchFeaturedLists = (fetch = true) => {
  const endpointString = "lists/featured";

  const { data, error, mutate } = useSWR<PaginatedListResponse, Error>(
    fetch ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedListResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    mutate,
  };
};

export default useFetchFeaturedLists;
