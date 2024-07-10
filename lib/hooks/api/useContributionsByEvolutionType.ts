import { useState } from "react";
import useSWR, { Fetcher } from "swr";

import { publicApiFetcher } from "lib/utils/public-api-fetcher";
import { ContributionEvolutionByTypeDatum } from "components/molecules/ContributionsEvolutionByTypeCard/contributions-evolution-by-type-card";
import { ContributorType } from "components/Graphs/shared/contributor-type-filter";

/**
 * Fetch most active contributors from a list.
 *
 */
const useContributionsEvolutionByType = ({
  listId,
  range = 30,
  defaultContributorType = "all",
  repos,
}: {
  listId: string;
  range: number;
  defaultContributorType?: ContributorType;
  repos?: string[];
}) => {
  const [contributorType, setContributorType] = useState<ContributorType>(defaultContributorType);

  const query = new URLSearchParams();
  query.set("contributorType", `${contributorType}`);
  query.set("range", `${range}`);

  if (repos && repos.length > 0) {
    query.set("repos", repos.join(","));
  }

  const apiEndpoint = `lists/${listId}/stats/contributions-evolution-by-contributor-type?${query.toString()}`;

  const { data, error, mutate } = useSWR<ContributionEvolutionByTypeDatum[], Error>(
    listId ? apiEndpoint : null,
    publicApiFetcher as Fetcher<ContributionEvolutionByTypeDatum[], Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    contributorType,
    setContributorType,
  };
};

export default useContributionsEvolutionByType;
