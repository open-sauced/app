import { useState } from "react";
import useSWR from "swr";

interface PaginatedContributorsResponse {
  readonly data: DbContribution[];
  readonly meta: Meta;
}

const useTopicContributions = (topic = "hacktoberfest") => {
  const [page, setPage] = useState(1);
  const baseEndpoint = `${topic}/contributions?page=${page}`;
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<PaginatedContributorsResponse, Error>(endpointString);

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

export { useTopicContributions };
