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

  const getEmojiUrlById = (id: string) => {
    return data && data.data.filter((emoji) => emoji.id === id)[0].url;
  };
  return {
    data: data?.data ?? [],
    isError: !!error,
    isLoading: !error && !data,
    mutate,
    getEmojiUrlById
  };
};

export default useFetchAllEmojis;
