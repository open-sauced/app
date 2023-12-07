import useSWR, { Fetcher } from "swr";
import { useState } from "react";

import publicApiFetcher from "lib/utils/public-api-fetcher";
import { supabase } from "lib/utils/supabase";

interface PaginatedListResponse {
  data: DbUserList[];
  meta: Meta;
}

interface PaginatedListContributorsResponse {
  data: DbListContributor[];
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
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        data,
        error: null,
      };
    } else {
      const error = await response.json();
      return {
        data: null,
        error: { message: error.message, listId },
      };
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log(error);
    return {
      data: null,
      error: { message: error.message, listId },
    };
  }
};

interface ListContributorsHighlightsProps {
  listId: string;
  repo?: string;
  range?: number;
  initialData?: PaginatedListContributorsHighlightsResponse;
}

export interface PaginatedListContributorsHighlightsResponse {
  data: DbHighlight[];
  meta: Meta;
}
const useFetchListContributorsHighlights = ({
  listId,
  repo,
  initialData,
  range = 30,
}: ListContributorsHighlightsProps) => {
  const query = new URLSearchParams();

  if (repo) {
    query.set("repo", repo);
  }

  query.set("range", `${range}`);

  const endpointString = `lists/${listId}/contributors/highlights?${query.toString()}`;

  const { data, error, mutate } = useSWR<PaginatedListContributorsHighlightsResponse, Error>(
    listId ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedListContributorsHighlightsResponse, Error>,
    {
      fallbackData: initialData,
    }
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error && Object.keys(error).length > 0,
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    mutate,
  };
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

export type TaggedRepoObject = { full_name: string };
interface PaginatedHighlightsRepoProps {
  data: TaggedRepoObject[];
  meta: Meta;
}

const useListHighlightsTaggedRepos = (listId: string) => {
  const { data, error, mutate } = useSWR<PaginatedHighlightsRepoProps, Error>(
    `lists/${listId}/contributors/highlights/tagged-repos?limit=50&page=1`,
    publicApiFetcher as Fetcher<PaginatedHighlightsRepoProps, Error>
  );

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isError: !!error && Object.keys(error).length > 0,
    mutate,
  };
};

export {
  useList,
  useFetchAllLists,
  useFetchListContributors,
  addListContributor,
  useFetchListContributorsHighlights,
  useListHighlightsTaggedRepos,
};
