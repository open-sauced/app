import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

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
    isError: !!error && Object.keys(error).length > 0,
    mutate
  };
};

export default useInsight;
