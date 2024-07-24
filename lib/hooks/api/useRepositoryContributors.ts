import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  readonly data: DbRepoContributor[];
  readonly meta: Meta;
}

type OrderDirection = "ASC" | "DESC";
type UseRepositoryContributorsProps = {
  repository: string;
  range: number;
  page: number;
  limit: number;
  orderDirection: OrderDirection;
};

export default function useRepositoryContributors({
  repository,
  range = 30,
  page = 1,
  limit = 1000,
  orderDirection = "ASC",
}: UseRepositoryContributorsProps) {
  const query = new URLSearchParams();

  if (page) {
    query.set("page", `${page}`);
  }

  if (range) {
    query.set("range", `${range}`);
  }

  if (limit) {
    query.set("limit", `${limit}`);
  }

  if (orderDirection) {
    query.set("orderDirection", orderDirection);
  }

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    `repos/${repository}/contributors?${query.toString()}`,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
}
