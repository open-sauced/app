import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

interface useFetchUserHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}
const useFetchFollowingHighlights = (repo = "") => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const pageQuery = page ? `page=${page}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";
  const repoQuery = repo ? `&repo=${repo}` : "";

  const { data, error, mutate } = useSWR<useFetchUserHighlightsResponse, Error>(
    `user/highlights/following?${pageQuery}${limitQuery}${repoQuery}`,
    publicApiFetcher as Fetcher<useFetchUserHighlightsResponse, Error>
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

export { useFetchFollowingHighlights };
