import publicApiFetcher from "lib/utils/public-api-fetcher";
import useSWR, { Fetcher } from "swr";

interface PaginatedEmojiResponse {
  data: DbEmojis[];
  meta: Meta;
}
const useFetchAllEmojis = () => {
  const { data, error, mutate } = useSWR<PaginatedEmojiResponse, Error>(
    "emojis",
    publicApiFetcher as Fetcher<PaginatedEmojiResponse, Error>
  );

  const getEmojiNameById = (id: string) => {
    return data ? data.data.filter((emoji) => emoji.id === id)[0].name : "";
  };
  return {
    data: data?.data ?? [],
    isError: !!error,
    isLoading: !error && !data,
    mutate,
    getEmojiNameById
  };
};

export default useFetchAllEmojis;
