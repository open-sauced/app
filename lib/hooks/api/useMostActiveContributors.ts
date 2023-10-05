import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { ContributorStat } from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";

interface PaginatedResponse {
  readonly data: ContributorStat[];
  readonly meta: Meta;
}

export function getTotalContributions(contributor: ContributorStat) {
  return Object.values(contributor).reduce((acc, curr) => {
    if (typeof curr === "number") {
      return acc + curr;
    }
    return acc;
  }, 0);
}

/**
 * Fetch most active contributors from a list.
 *
 */
const useMostActiveContributors = ({
  listId,
  initData,
  intialLimit = 20,
  initialRange = 30,
}: {
  listId: string;
  initData?: ContributorStat[];
  intialLimit?: number;
  initialRange?: number;
}) => {
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(initialRange);
  const [limit, setLimit] = useState(intialLimit);

  const query = new URLSearchParams();
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);
  // Change this to total_contributions once implemented
  query.set("orderBy", "commits");
  query.set("orderDirection", "DESC");

  const apiEndpoint = `lists/${listId}/stats/most-active-contributors?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    apiEndpoint,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data:
      data?.data
        ?.map((contributor) => ({
          ...contributor,
          total_contributions: getTotalContributions(contributor),
        }))
        .sort((a, b) => b.total_contributions - a.total_contributions) ?? [],
    isLoading: !error && !data,
    isError: !!error,
    setRange,
  };
};

export default useMostActiveContributors;
