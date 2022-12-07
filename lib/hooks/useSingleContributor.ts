import getFilterQuery from "lib/utils/get-filter-query";
import { useRouter } from "next/router";
import useSWR from "swr";

interface PaginatedRepoPRResponse {
  readonly data: DbContribution[];
  readonly meta: Meta;
}

const useSingleContributor = (contributor: string)=> {
  const router = useRouter();
  const { filterName} = router.query;
  const topic = filterName as string;

  const baseEndPoint = `${topic}/contributions`;
  const endPointString = `${baseEndPoint}?page=1&limit=1&range=30&contributors=${contributor}`;
  const { data, error } = useSWR<PaginatedRepoPRResponse>(endPointString);

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error
  };
};

export {useSingleContributor};
