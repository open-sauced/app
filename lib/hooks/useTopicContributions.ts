import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import getFilterQuery from "lib/utils/get-filter-query";

interface PaginatedContributorsResponse {
  readonly data: DbContribution[];
  readonly meta: Meta;
}

const useTopicContributions = (initialLimit = 10, repoIds: number[] = []) => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);


  const baseEndpoint = `${topic}/contributions`;
  const pageQuery = page ? `page=${page}` : "";
  const filterQuery = getFilterQuery(selectedFilter);
  const limitQuery = limit ? `&limit=${limit}` : "";
  const reposQuery = repoIds.length > 0 ? `&repoIds=${repoIds.join(",")}`: "";
  const endpointString = `${baseEndpoint}?${pageQuery}${filterQuery}${limitQuery}${reposQuery}`;

  const { data, error, mutate } = useSWR<PaginatedContributorsResponse, Error>(topic ? endpointString : null);

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

export { useTopicContributions };
