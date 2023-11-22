import useSWR, { Fetcher, SWRConfiguration } from "swr";

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
  tz?: string;
  initialLimit?: number;
  contributor?: string;
};

const useFetchAllContributors = (query: queryObj, config?: SWRConfiguration, makeRequest = true) => {
  const { toast } = useToast();
  const router = useRouter();
  const { pr_velocity, location, tz, contributor } = query;
  const { page, limit } = router.query;

  const urlQuery = new URLSearchParams();

  if (page) {
    urlQuery.set("page", `${page}`);
  }
  if (location) {
    urlQuery.set("location", `${location}`);
  }
  if (pr_velocity) {
    urlQuery.set("pr_velocity", `${pr_velocity}`);
  }
  if (tz) {
    urlQuery.set("timezone", `${tz}`);
  }
  if (contributor) {
    urlQuery.set("contributor", `${contributor}`);
  }
  if (limit) {
    urlQuery.set("limit", `${limit}`);
  }

  const baseEndpoint = "lists/contributors";
  const endpointString = `${baseEndpoint}?${urlQuery}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    makeRequest ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>,
    config
  );

  const contributors = convertToContributors(data?.data);

  return {
    data: data ? contributors : [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data && makeRequest,
    isError: !!error,
    mutate,
    page,
  };
};

export default useFetchAllContributors;
