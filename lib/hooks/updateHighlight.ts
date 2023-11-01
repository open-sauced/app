import { supabase } from "lib/utils/supabase";

interface CreateHighlightsProps {
  url: string;
  title?: string;
  highlight: string;
  shipped_at?: Date;
  type: "issue" | "pull_request" | "blog_post";
  taggedRepos: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const updateHighlights = async (data: CreateHighlightsProps, id: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  try {
    const res = await fetch(`${baseUrl}/user/highlights/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      method: "PATCH",
      body: JSON.stringify({ ...data }),
    });

    if (!res.ok) {
      return false;
    }
    return res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return false;
  }
};

export { updateHighlights };
