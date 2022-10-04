import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import getFilterKey from "lib/utils/get-filter-key";
import useFilterOptions from "./useFilterOptions";
import apiFetcher from "./useSWR";

type FilterValues = { [name: string]: number | undefined };

const useFilterPrefetch = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const filterOptions = useFilterOptions();
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const { filterName: topic } = router.query;

  useEffect(() => {
    if (topic) {
      filterOptions.forEach(async(filterName) => {
        const filterKey = getFilterKey(filterName);
        const url = `${topic}/repos?filter=${filterKey}&page=1`;

        try {
          const result: { meta: Meta } = await mutate(url, apiFetcher(url));

          setFilterValues(values => {
            return {
              ...values,
              [filterKey]: result.meta.itemCount
            };
          });
        } catch (e) {
          setFilterValues(values => {
            return {
              ...values,
              [filterKey]: undefined
            };
          });
        }
      });
    }
  }, [topic]);

  return { filterValues };
};

export default useFilterPrefetch;