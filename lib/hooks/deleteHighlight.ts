import { supabase } from "lib/utils/supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const deleteHighlight = async (id: string) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  try {
    const res = await fetch(`${baseUrl}/user/highlights/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      method: "DELETE"
    });

    if (res.ok) {
      return true;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};

export { deleteHighlight };
