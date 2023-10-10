import useSWR, { Fetcher } from "swr";
import { useState } from "react";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { supabase } from "lib/utils/supabase";

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

const addListContributor = async (listId: string, contributors: number[]) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${listId}/contributors`, {
      method: "POST",
      body: JSON.stringify({ contributors }),
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const useList = (listId: string) => {
  const { data, error, mutate } = useSWR<any>(`lists/${listId}`, publicApiFetcher as Fetcher<any, Error>);

  return {
    data: data,
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export { useList, useFetchAllLists, useFetchListContributors, addListContributor };
