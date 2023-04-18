import useSWR, { Fetcher } from "swr";
import useSupabaseAuth from "./useSupabaseAuth";
import publicApiFetcher from "lib/utils/public-api-fetcher";
import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";
interface PaginatedInsightMembers {
  data: DbInsightMember[];
  meta: Meta;
}

const useInsightMembers = (insightId: number) => {
  const { sessionToken } = useSupabaseAuth();

  const { data, error, mutate } = useSWR<PaginatedInsightMembers, Error>(
    `user/insights/${insightId}/members`,
    publicApiFetcher as Fetcher<PaginatedInsightMembers, Error>
  );

  const addMember = async (email: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ email })
    });

    if (!req.ok) {
      console.log(req.status, req.statusText);
      return undefined;
    } else {
      mutate();
      return req.json();
    }
  };

  const updateMember = async (memberId: string, access: MemberAccess) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members/${memberId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      body: JSON.stringify({ access })
    });

    if (!req.ok) {
      console.log(req.status, req.statusText);

      return undefined;
    } else {
      mutate();
      return req.json();
    }
  };

  const deleteMember = async (memberId: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members/${memberId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      }
    });

    if (req.ok) {
      mutate();
    }
  };

  return {
    data: data?.data ?? [],
    isLoading: !error && !data,
    isError: !!error,
    mutate,
    addMember,
    updateMember,
    deleteMember
  };
};

export default useInsightMembers;
