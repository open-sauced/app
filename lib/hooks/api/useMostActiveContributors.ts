import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import { expPublicApiFetcher } from "lib/utils/public-api-fetcher";
import { ContributorStat } from "components/molecules/MostActiveContributorsCard/most-active-contributors-card";
import { ContributorType } from "components/Graphs/shared/contributor-type-filter";

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
  defaultContributorType = "all",
  repos,
}: {
  listId: string;
  initData?: ContributorStat[];
  intialLimit?: number;

  defaultContributorType?: ContributorType;
  repos?: string[];
}) => {
  const [limit, setLimit] = useState(intialLimit);
  const router = useRouter();
  const { range = "30" } = router.query;
  const [contributorType, setContributorType] = useState<ContributorType>(defaultContributorType);

  const query = new URLSearchParams();
  query.set("contributorType", `${contributorType}`);
  query.set("limit", `${limit}`);
  query.set("range", range as string);
  // Change this to total_contributions once implemented
  query.set("orderBy", "total_contributions");
  query.set("orderDirection", "DESC");

  if (repos) {
    query.set("repos", repos.join(","));
  }

  const apiEndpoint = `lists/${listId}/stats/most-active-contributors?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    listId && repos ? apiEndpoint : null,
    expPublicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    contributorType,
    setContributorType,
  };
};

export default useMostActiveContributors;
