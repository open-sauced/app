import { Octokit } from "octokit";
import { supabase } from "lib/utils/supabase";

interface GhIssueInfoResponse {
  data: GhIssueInfoResponse;
  status: number;
  headers: {};
}
const fetchGithubIssueInfo = async (orgName: string | null, repoName: string | null, issueId: string | null) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.provider_token;
  try {
    const octokit = new Octokit({ auth: sessionToken });

    const response: GhIssueInfoResponse = await octokit.request("GET /repos/{orgName}/{repoName}/issues/{issueId}", {
      orgName,
      repoName,
      issueId,
    });

    return {
      data: response.data ?? undefined,
      isError: null,
    };
  } catch (e) {
    console.log(e);

    return {
      data: null,
      isError: true,
    };
  }
};

export { fetchGithubIssueInfo };
