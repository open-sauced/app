import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export interface HighlightReactorResponse {
  emoji_id: string;
  reaction_count: string;
  reaction_users: string[];
}

const useHighlightReactors = (id: string) => {
  const { data, error, mutate } = useSWR<HighlightReactorResponse[], Error>(
    id ? `user/highlights/${id}/reactors` : null,
    publicApiFetcher as Fetcher<HighlightReactorResponse[], Error>
  );

  return {
    data: data ?? [],
    isError: !!error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useHighlightReactors;
