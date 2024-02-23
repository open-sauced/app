import useSWR, { Fetcher } from "swr";
import { useState } from "react";
import { publicApiFetcher } from "lib/utils/public-api-fetcher";

interface PaginatedResponse {
  data: WorkspaceMember[];
  meta: Meta;
}

export const useWorkspaceMembers = ({
  workspaceId,
  initialPage = 1,
  limit = 30,
}: {
  workspaceId: string | null;
  initialPage?: number;
  limit?: number;
}) => {
  const [page, setPage] = useState(initialPage);
  const searchParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const endpointString = `workspaces/${workspaceId}/members?${searchParams}`;

  const { data, error, mutate } = useSWR<PaginatedResponse, Error>(
    workspaceId ? endpointString : null,
    publicApiFetcher as Fetcher<PaginatedResponse, Error>
  );

  const addMember = async (workspaceId: string, sessionToken: string | null | undefined, username: string) => {
    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${username}`);

    if (userResponse.status === 404) {
      return false;
    }

    const user = (await userResponse.json()) as DbUser;

    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}/members`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ members: [{ id: user.id, role: "viewer" }] }),
    });

    if (!req.ok) {
      // eslint-disable-next-line no-console
      console.log(req.status, req.statusText);
      return false;
    } else {
      mutate();
      return req.json();
    }
  };

  const updateMember = async (
    workspaceId: string,
    sessionToken: string | null | undefined,
    memberId: string,
    role: WorkspaceMemberRole
  ) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}/members/${memberId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify({ role }),
    });

    if (!req.ok) {
      // eslint-disable-next-line no-console
      console.log(req.status, req.statusText);

      return false;
    } else {
      mutate();
      return req.json() as unknown as WorkspaceMember;
    }
  };

  const deleteMember = async (workspaceId: string, sessionToken: string | null | undefined, memberId: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspaces/${workspaceId}/members/${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    if (req.ok) {
      mutate();
    }
  };

  return {
    data: data?.data ?? [],
    meta: data?.meta ?? { itemCount: 0, limit: 0, page: 0, hasNextPage: false, hasPreviousPage: false, pageCount: 0 },
    isLoading: !error && !data,
    isError: !!error,
    page,
    setPage,
    mutate,
    addMember,
    updateMember,
    deleteMember,
  };
};
