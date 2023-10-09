import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import {
  ContributorStat,
  ContributorType,
} from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";

interface PaginatedResponse {
  readonly data: ContributorStat[];
  readonly meta: Meta & { allContributionsCount: number };
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
  defaultContributorType = "all",
}: {
  listId: string;
  initData?: ContributorStat[];
  intialLimit?: number;
  initialRange?: number;
  defaultContributorType?: ContributorType;
}) => {
  const [range, setRange] = useState(initialRange);
  const [limit, setLimit] = useState(intialLimit);
  const [contributorType, setContributorType] = useState<ContributorType>(defaultContributorType);

  const query = new URLSearchParams();
  query.set("contributorType", `${contributorType}`);
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);
  // Change this to total_contributions once implemented
  query.set("orderBy", "total_contributions");
  query.set("orderDirection", "DESC");

  const apiEndpoint = `lists/${listId}/stats/most-active-contributors?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    apiEndpoint,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    setRange,
    contributorType,
    setContributorType,
  };
};

export default useMostActiveContributors;
