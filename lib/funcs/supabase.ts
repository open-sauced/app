export interface ProcessEnv {
  [key: string]: string | undefined
}

import {createClient, User} from "@supabase/supabase-js";

// TODO: Move these to ENV on PR #96
export const supabase = createClient(
  "https://lkkownkrbkmblczeoyqb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyNDU2MTc0LCJleHAiOjE5NTgwMzIxNzR9.c6nlkT05GnNacQ6OYuGcjBsILmGsSDwEEtN2zZVXFgY"
);
