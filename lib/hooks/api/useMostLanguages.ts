import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { useRouter } from "next/router";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { ContributorType } from "components/Graphs/shared/contributor-type-filter";

interface PaginatedResponse {
  readonly data: MostUsedLanguageStat[];
  readonly meta: Meta & { allContributionsCount: number };
}

export interface MostUsedLanguageStat {
  name: string;
  value: number;
}

/**
 * Fetch most active contributors from a list.
 *
 */
const useMostLanguages = ({
  listId,
  intialLimit = 20,
  defaultContributorType = "all",
}: {
  listId: string;
  intialLimit?: number;
  defaultContributorType?: ContributorType;
}) => {
  const router = useRouter();
  const { range = "30" } = router.query;
  const [contributorType, setContributorType] = useState<ContributorType>(defaultContributorType);

  const query = new URLSearchParams();
  query.set("contributorType", `${contributorType}`);
  query.set("range", range as string);

  const apiEndpoint = `lists/${listId}/stats/most-used-languages?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    listId ? apiEndpoint : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
    contributorType,
    setContributorType,
  };
};

export default useMostLanguages;
