import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

const useInsight = (id: string) => {
  const baseEndpoint = `insights/${id}`;
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<DbUserInsight, Error>(
    id ? endpointString : null,
    publicApiFetcher as Fetcher<DbUserInsight, Error>
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export default useInsight;
