import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { useToast } from "./useToast";

interface PaginatedResponse {
  readonly data: DBListContributor[];
  readonly meta: Meta;
}

const useFetchAllContributors = (initialLimit = 10) => {
  const { toast } = useToast();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const { location, pr_velocity, timezone } = router.query;

  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }
  if (location) {
    query.set("location", `${location}`);
  }
  if (pr_velocity) {
    query.set("pr_velocity", `${pr_velocity}`);
  }
  if (timezone) {
    query.set("timezone", `${timezone}`);
  }
  if (limit) {
    query.set("limit", `${limit}`);
  }

  const baseEndpoint = "lists/contributors";
  const endpointString = `${baseEndpoint}?${query}`;

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
    setLimit,
  };
};

export default useFetchAllContributors;
