import { supabase } from "lib/utils/supabase";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export type UserResponse = Partial<DbUser>
const authSession = async () => {
  const sessionResponse = await supabase.auth.getSession();
  const sessionToken = sessionResponse?.data.session?.access_token;
  // const { data, error } = useSWR<UserResponse, Error>("auth/session", publicApiFetcher as Fetcher<UserResponse, Error>);
  const response = await fetch(`${baseUrl}/auth/session`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionToken}`
    }
  });

  if (response.status === 200) {
    return response.json();
  } else {
    return false;
  }
};

export { authSession };
