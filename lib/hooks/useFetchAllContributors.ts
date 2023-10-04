import { useState } from "react";
import useSWR, { Fetcher, SWRConfiguration } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { useToast } from "./useToast";
import { convertToContributors } from "./api/useContributorList";

interface PaginatedResponse {
  readonly data: DBListContributor[];
  readonly meta: Meta;
}

type queryObj = {
  location?: string;
  pr_velocity?: string;
  timezone?: string;
  initialLimit?: number;
};

const useFetchAllContributors = (query: queryObj, config?: SWRConfiguration) => {
  const { toast } = useToast();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(query.initialLimit ?? 10);

  const urlQuery = new URLSearchParams();

  if (page) {
    urlQuery.set("page", `${page}`);
  }
  if (query.location) {
    urlQuery.set("location", `${query.location}`);
  }
  if (query.pr_velocity) {
    urlQuery.set("pr_velocity", `${query.pr_velocity}`);
  }
  if (query.timezone) {
    urlQuery.set("timezone", `${query.timezone}`);
  }
  if (limit) {
    urlQuery.set("limit", `${limit}`);
  }

  const baseEndpoint = "lists/contributors";
  const endpointString = `${baseEndpoint}?${urlQuery}`;

  const { data, error, mutate } = useSWR<any, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>,
    config
  );

  const contributors = convertToContributors(data?.data);

  return {
    data: data ? contributors : [],
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
