import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const generateIssueHighlightSummary = async (issueTitle: string, issueBody: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  const payload = {
    descriptionLength: 400,
    issueTitle,
    issueBody,
    language: "english",
    diff: "issue",
    tone: "formal",
    temperature: 7,
  };

  try {
    const res = await fetch(`${baseUrl}/issues/description/generate`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      return data.description as string;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default generateIssueHighlightSummary;
