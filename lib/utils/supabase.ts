import { createClient, User } from "@supabase/supabase-js";

// TODO: Move these to ENV on PR #96
const supabaseCreds = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "",
  key: process.env.NEXT_PUBLIC_SUPABASE_KEY ? process.env.NEXT_PUBLIC_SUPABASE_KEY : ""
};

export const supabase = createClient(
  supabaseCreds.url,
  supabaseCreds.key
);
