import { User } from "@supabase/supabase-js";

export interface GlobalStateInterface {
  user: User | null;
  onboarded?: boolean;
  waitlisted?: boolean;
  range?: number;
  insightRepoLimit?: number;
  sessionToken?: string | null;
  providerToken?: string | null;
  userId?: number | null;
  hasReports?: boolean;
}
