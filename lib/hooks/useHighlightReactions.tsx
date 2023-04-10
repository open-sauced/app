import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

export interface HighlightReactionResponse {
  emoji_id: string;
  reaction_count: string;
}
const useHighlightReactions = (id: string) => {
  const { data, error, mutate } = useSWR<HighlightReactionResponse[], Error>(
    `highlights/${id}/reactions`,
    publicApiFetcher as Fetcher<HighlightReactionResponse[], Error>
  );

  return {
    data: data ?? [],
    isError: !!error,
    isLoading: !error && !data,
    mutate
  };
};

export default useHighlightReactions;
