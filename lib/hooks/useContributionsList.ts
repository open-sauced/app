import useSWR from "swr";

interface PaginatedRepoResponse {
  readonly data: DBContributions[];
  readonly meta: Meta;
}

const useContributionsList = () => {
  //The endpoint for all Hacktoberfest contributions doesn't exist yet so will substitute this for now
  const { data, error, mutate } = useSWR<PaginatedRepoResponse, Error>("repos/769/contributions");

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useContributionsList};
