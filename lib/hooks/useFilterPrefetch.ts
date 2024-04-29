import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFilterOptions from "./useFilterOptions";

type FilterValues = { [name: string]: number | undefined };

const useFilterPrefetch = () => {
  const router = useRouter();
  const filterOptions = useFilterOptions();
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const { pageId: topic } = router.query;

  useEffect(() => {
    if (topic) {
      filterOptions.forEach(async (filterName) => {
        setFilterValues((values) => {
          return {
            ...values,
            [filterName]: 0,
          };
        });
      });
    }
  }, [topic]);

  return { filterValues };
};

export default useFilterPrefetch;
