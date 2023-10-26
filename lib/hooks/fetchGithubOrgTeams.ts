import { Octokit } from "octokit";
import { supabase } from "lib/utils/supabase";

interface GhOrgTeamResponse {
  data: GhOrgTeam[];
  status: number;
  headers: {};
}

const fetchGithubOrgTeams = async (orgName: string | null) => {
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

    const response: GhOrgTeamResponse = await octokit.request("GET /orgs/{orgName}/teams", {
      orgName,
    });

    return {
      data: response.data ?? [],
      isError: null,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      isError: true,
    };
  }
};

export { fetchGithubOrgTeams };
