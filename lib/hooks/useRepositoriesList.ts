import useSWR from "swr";

const useRepositoriesList = () => {
  const { data, error, mutate } = useSWR<useRepoList, Error>("repo/list");

  return {
    repoList: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export {useRepositoriesList};
