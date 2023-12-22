const isInsightTeamMember = async (insightId: number, bearerToken: string, userId: string) => {
  try {
    const teamMembersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/insights/${insightId}/members`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-type": "application/json",
      },
    });

    if (teamMembersResponse.ok) {
      const teamMembers: DbInsightMember[] = (await teamMembersResponse.json()).data;
      return !!teamMembers.find((teamMember) => teamMember.user_id === Number(userId));
    } else {
      return false;
    }
  } catch (e: unknown) {
    return false;
  }
};

export default isInsightTeamMember;
