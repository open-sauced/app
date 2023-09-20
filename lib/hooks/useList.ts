import useSWR, { Fetcher } from "swr";
import { useState } from "react";

import publicApiFetcher from "lib/utils/public-api-fetcher";

interface PaginatedListResponse {
  data: DbUserList[];
  meta: Meta;
}

interface PaginatedListContributorsResponse {
  data: DbListContibutor[];
  meta: Meta;
}

const useFetchAllLists = (range = 30) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = new URLSearchParams();

  query.set("page", `${page}`);
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);

  const baseEndpoint = `lists?${query.toString()}`;
  const endpointString = `${baseEndpoint}`;

  const { data, error, mutate } = useSWR<PaginatedListResponse, Error>(
    endpointString,
    publicApiFetcher as Fetcher<PaginatedListResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    mutate,
    setPage,
    setLimit,
  };
};

const useFetchListContributors = (id: string, range = 30) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const query = new URLSearchParams();

  query.set("page", `${page}`);
  query.set("limit", `${limit}`);
  query.set("range", `${range}`);
  const endpointString = `lists/${id}/contributors?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedListContributorsResponse, Error>(
    id ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedListContributorsResponse, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    mutate,
    setPage,
    setLimit,
  };
};

const useList = (id: string) => {
  const baseEndpoint = `lists/${id}`;
  // const endpointString = `${baseEndpoint}`;

  const data: DbUserList = {
    id: "1",
    name: "List Name",
    user: {
      id: 1,
    },
  } as DbUserList;
  const error = false;
  const mutate = () => {};
  // const { data, error, mutate } = useSWR<DbUserList, Error>(
  //   id ? endpointString : null,
  //   publicApiFetcher as Fetcher<DbUserList, Error>
  // );

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export { useList, useFetchAllLists, useFetchListContributors };
