import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

const useInsightRepositories = (id: number) => {
  const baseEndpoint = `insights/${id}/repos`;
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<DbUserInsightRepo[], Error>(
    id ? endpointString : null,
    publicApiFetcher as Fetcher<DbUserInsightRepo[], Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export default useInsightRepositories;
