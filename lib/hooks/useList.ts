// import useSWR, { Fetcher } from "swr";
// import publicApiFetcher from "lib/utils/public-api-fetcher";

const useList = (id: string) => {
  const baseEndpoint = `lists/${id}`;
  // const endpointString = `${baseEndpoint}`;

  const data: DbUserList = {
    id: "1",
    name: "List Name",
    user: {
      id: 1,
    },
  } as DbUserList;
  const error = false;
  const mutate = () => {};
  // const { data, error, mutate } = useSWR<DbUserList, Error>(
  //   id ? endpointString : null,
  //   publicApiFetcher as Fetcher<DbUserList, Error>
  // );

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export default useList;
