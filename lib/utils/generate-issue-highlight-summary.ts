import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const generateIssueHighlightSummary = async (issueTitle: string, issueBody: string, issueComments: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  const payload = {
    summaryLength: 400,
    issueTitle,
    issueDescription: issueBody,
    issueComments,
    language: "english",
    diff: "issue",
    tone: "formal",
    temperature: 7,
  };

  try {
    const res = await fetch(`${baseUrl}/issues/summary/generate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data.summary as string;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default generateIssueHighlightSummary;
