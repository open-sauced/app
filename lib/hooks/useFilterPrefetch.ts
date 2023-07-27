import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import getFilterKey from "lib/utils/get-filter-key";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import useFilterOptions from "./useFilterOptions";

type FilterValues = { [name: string]: number | undefined };

const useFilterPrefetch = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const filterOptions = useFilterOptions();
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const { filterName: topic } = router.query;

  useEffect(() => {
    if (topic) {
      filterOptions.forEach(async (filterName) => {
        const filterKey = getFilterKey(filterName);
        const url = `repos/search?topic=${topic}&filter=${filterKey}&page=1`;

        try {
          // @ts-ignore
          const result: { meta: Meta } = await mutate(url, publicApiFetcher(url));

          setFilterValues((values) => {
            return {
              ...values,
              [filterKey]: result.meta.itemCount,
            };
          });
        } catch (e) {
          setFilterValues((values) => {
            return {
              ...values,
              [filterKey]: undefined,
            };
          });
        }
      });
    }
  }, [topic]);

  return { filterValues };
};

export default useFilterPrefetch;
