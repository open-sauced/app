import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbPRContributor[];
  readonly meta: Meta;
}

type Type = "new" | "recent" | "churn";
const useInsightsContributors = (limit = 10, repoIds: number[] = [], type: Type = "recent") => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { range } = router.query;

  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (repoIds?.length > 0) {
    query.set("repoIds", repoIds.join(","));
  }

  query.set("range", `${range ?? 30}`);

  const baseEndpoint = `contributors/insights/${type}`;
  const endpointString = `${baseEndpoint}?${query.toString()}`;

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
  };
};

export default useInsightsContributors;
