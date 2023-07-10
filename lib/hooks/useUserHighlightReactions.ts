import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import { HighlightReactionResponse } from "./useHighlightReactions";
import useSupabaseAuth from "./useSupabaseAuth";

const useUserHighlightReactions = (id: string) => {
  const { sessionToken } = useSupabaseAuth();
  const { data, error, mutate } = useSWR<HighlightReactionResponse[], Error>(
    id ? `user/highlights/${id}/reactions` : null,
    publicApiFetcher as Fetcher<HighlightReactionResponse[], Error>
  );

  const addReaction = async (emojiId: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/highlights/${id}/reactions/${emojiId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }).catch((err) => console.log(err));
    if (req && req.ok) {
      mutate();
    }
  };

  const deleteReaction = async (emojiId: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/highlights/${id}/reactions/${emojiId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }).catch((err) => console.log(err));
    if (req && req.ok) {
      mutate();
    }
  };

  return {
    data: data ?? [],
    isError: !!error,
    isLoading: !error && !data,
    mutate,
    addReaction,
    deleteReaction,
  };
};

export default useUserHighlightReactions;
