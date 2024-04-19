import { supabase } from "./supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const generateDevToBlogHighlightSummary = async (blogTitle: string, blogMarkdown: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  const payload = {
    summaryLength: 400,
    blogTitle,
    blogMarkdown,
    language: "english",
    diff: "issue",
    tone: "formal",
    temperature: 7,
  };

  try {
    const res = await fetch(`${baseUrl}/blogs/summary/generate`, {
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
    // eslint-disable-next-line no-console
    console.log(err);
    return null;
  }
};

export default generateDevToBlogHighlightSummary;
