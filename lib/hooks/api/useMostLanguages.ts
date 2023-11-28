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
  contributorType = "all",
}: {
  listId: string;
  contributorType?: ContributorType;
}) => {
  const router = useRouter();
  const { range = 30 } = router.query;
  const { limit = 20 } = router.query;

  const query = new URLSearchParams();
  query.set("contributorType", `${contributorType}`);
  query.set("range", `${range}`);
  query.set("limit", `${limit}`);

  const apiEndpoint = `lists/${listId}/stats/most-used-languages?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    listId ? apiEndpoint : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useMostLanguages;
