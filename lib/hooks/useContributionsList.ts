import useSWR from "swr";

interface PaginatedContributorsResponse {
  readonly data: DbContribution[];
  readonly meta: Meta;
}

const useContributionsList = (repoId: string, limit = "", orderBy = "") => {
  //The endpoint for all Hacktoberfest contributions doesn't exist yet so will substitute this for now
  const baseEndpoint = `repos/${repoId}/contributions`;
  const limitQuery = `orderBy=last_commit_time${limit === "" ? limit : `&limit=${limit}`}`;
  const orderByQuery = orderBy ? `&updated_at=${orderBy}` : "";
  const endpointString = `${baseEndpoint}?${limitQuery}${orderByQuery}`;

  const { data, error, mutate } = useSWR<PaginatedContributorsResponse, Error>(endpointString);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useContributionsList};
