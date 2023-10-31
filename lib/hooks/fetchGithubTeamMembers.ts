import { Octokit } from "octokit";
import { supabase } from "lib/utils/supabase";

interface GhOrgTeamMembersResponse {
  data: GhOrgTeamMember[];
  status: number;
  headers: {};
}

const fetchGithubOrgTeamMembers = async (orgName: string, teamSlug: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.provider_token;

  if (!sessionToken) {
    return {
      data: [],
      isError: true,
    };
  }

  try {
    const octokit = new Octokit({ auth: sessionToken });

    const response: GhOrgTeamMembersResponse = await octokit.request("GET /orgs/{orgName}/teams/{teamSlug}/members", {
      orgName,
      teamSlug,
    });

    return {
      data: response.data ?? [],
      isError: null,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return {
      data: [],
      isError: true,
    };
  }
};

export { fetchGithubOrgTeamMembers };
