import useSWR, { Fetcher } from "swr";
import useSupabaseAuth from "./useSupabaseAuth";
import publicApiFetcher from "lib/utils/public-api-fetcher";
interface PaginatedInsightMembers {
  data: DbInsightMember[];
  meta: Meta;
}

const useInsightMembers = (page_id: number) => {
  const { data, error, mutate } = useSWR<PaginatedInsightMembers, Error>(
    `user/insights/${page_id}/members`,
    publicApiFetcher as Fetcher<PaginatedInsightMembers, Error>
  );

  return {
    data: data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate
  };
};

export default useInsightMembers;
