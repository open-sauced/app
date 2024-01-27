import useSWR, { Fetcher } from "swr";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

export const useContributionsByProject = ({
  listId,
  range,
  initialData,
}: {
  listId: string;
  range: number;
  initialData?: DbProjectContributions[];
}) => {
  const { data, error, isLoading } = useSWR<DbProjectContributions[]>(
    listId ? `lists/${listId}/stats/contributions-by-project?range=${range}` : null,
    publicApiFetcher as Fetcher<DbProjectContributions[], Error>,
    {
      fallbackData: initialData,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};
