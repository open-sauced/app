import { createClient, User } from "@supabase/supabase-js";

// TODO: Move these to ENV on PR #96
const supabaseCreds = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "",
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY ? process.env.NEXT_PUBLIC_SUPABASE_API_KEY : ""
};

export const supabase = createClient(
  supabaseCreds.url,
  supabaseCreds.apiKey
);
