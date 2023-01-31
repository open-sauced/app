import { supabase } from "lib/utils/supabase";

interface UpdateEmailProps {
  display_email?: boolean;
  receive_collaboration?: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const updateEmailPreferences = async (data: UpdateEmailProps) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  try {
    const res = await fetch(`${baseUrl}/auth/profile/email`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      method: "PATCH",
      body: JSON.stringify({ ...data })
    });

    if (res.status === 200) {
      return res.json();
    }
  } catch (e) {
    return false;
  }
};

export { updateEmailPreferences };
