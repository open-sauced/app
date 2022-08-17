import useSWR from "swr";

const useRepoList = () => {
  const { data, error, mutate } = useSWR("repos/list");

  return {
    repoList: data || {data: []},
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepoList};
