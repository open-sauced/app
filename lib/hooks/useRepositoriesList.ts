import useSWR from "swr";

// Mission Start!

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
