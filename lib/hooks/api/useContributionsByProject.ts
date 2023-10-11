import useSWR, { Fetcher } from "swr";
import publicApiFetcher from "lib/utils/public-api-fetcher";

export const useContributionsByProject = ({
  listId,
  range,
  initialData,
}: {
  listId: string;
  range: number;
  initialData?: DbProjectContributions[];
}) => {
  const { data, error } = useSWR<DbProjectContributions[]>(
    `lists/${listId}/stats/contributions-by-project?range=${range}`,
    publicApiFetcher as Fetcher<DbProjectContributions[], Error>
    // {
    //   fallbackData: {
    //     `lists/${listId}/stats/contributions-by-project?range=${range}`: initialData
    // },
    // }
  );

  return {
    data,
    error,
  };
};
