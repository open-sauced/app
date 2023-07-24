import changeCapitalization from "lib/utils/change-capitalization";
import { supabase } from "lib/utils/supabase";

interface CreateHighlightsProps {
  url: string;
  title?: string;
  highlight: string;
  shipped_at?: Date;
}

interface ServerError {
  statusCode: number;
  message: string[];
  error: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const createHighlights = async (data: CreateHighlightsProps) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;

  try {
    const response = await fetch(`${baseUrl}/user/highlights`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`,
      },
      method: "POST",
      body: JSON.stringify({ ...data }),
    });

    if (!response.ok) {
      throw response;
    }

    return response.json();
  } catch (error) {
    return (error as Response).json().then((err: Error | ServerError) => {
      if (err instanceof Error) {
        return changeCapitalization(err.message, true);
      }

      return changeCapitalization(err.message[0], true);
    });
  }
};

export { createHighlights };
