import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const generatePrHighlightSummaryByCommitMsg = async (commitMessages: string[]) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  const payload = {
    descriptionLength: 250,
    commitMessages,
    language: "english",
    diff: "commitMessage",
    tone: "formal",
    temperature: 7,
  };

  try {
    const res = await fetch(`${baseUrl}/prs/description/generate`, {
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
    }

    console.log(res);
  } catch (err) {
    console.log(err);
    return null;
  }
};
