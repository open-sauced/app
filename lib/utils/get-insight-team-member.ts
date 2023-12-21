import { MemberAccess } from "components/molecules/TeamMembersConfig/team-members-config";

const getInsightTeamMemberAccess = async (
  insightId: number,
  bearerToken: string,
  userId: string
): Promise<MemberAccess | null> => {
  try {
    const teamMembersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-type": "application/json",
      },
    });

    if (teamMembersResponse.ok) {
      const teamMembers: DbInsightMember[] = (await teamMembersResponse.json()).data;
      const teamMember = teamMembers.find((teamMember) => teamMember.user_id === Number(userId));

      if (!teamMember) {
        return null;
      }

      return teamMember.access;
    } else {
      return null;
    }
  } catch (e: unknown) {
    return null;
  }
};

export default getInsightTeamMemberAccess;
