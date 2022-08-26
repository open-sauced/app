import useSWR from "swr";

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR("repo/list");

  return {
    repoList: data || {data: []},
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoriesList};
