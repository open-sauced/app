import { supabase } from "lib/utils/supabase";

interface CreateHighlightsProps {
  url: string;
  title?: string;
  highlight: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const createHighlights = async (data: CreateHighlightsProps) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;

  const response = await fetch(`${baseUrl}/user/highlights`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`
    },
    method: "POST",
    body: JSON.stringify({ ...data })
  }).then((res) => res.json());

  return  response;
};

export { createHighlights };
