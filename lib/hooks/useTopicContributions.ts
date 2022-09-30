import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

interface PaginatedContributorsResponse {
  readonly data: DbContribution[];
  readonly meta: Meta;
}

const useTopicContributions = (customLimit = 10) => {
  const router = useRouter();
  const { filterName, selectedFilter } = router.query;
  const topic = filterName as string;
  const filter = selectedFilter as string;    
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(customLimit);

  const baseEndpoint = `${topic}/contributions`;
  const pageQuery = page ? `page=${page}` : "";
  const filterQuery = filter ? `&filter=${filter}` : "";
  const limitQuery = limit ? `&limit=${limit}` : "";
  const endpointString = `${baseEndpoint}?${pageQuery}${filterQuery}${limitQuery}`;

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
