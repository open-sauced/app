import { supabase } from "lib/utils/supabase";

interface useUpdateUserProps {

  data: { email?: string; interests?: string[] };
  params?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const updateUser = async ({  data, params }: useUpdateUserProps) => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  try {
    const res = await fetch(`${baseUrl}/auth/profile${params ? `/${params}` : ""}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken}`
      },
      method: "PATCH",
      body: JSON.stringify({ ...data })
    });

    if (res.status === 200) {
      return res.ok;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};

export { updateUser };
