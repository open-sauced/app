import { User } from "@supabase/supabase-js";

export interface GlobalStateInterface {
  user?: User | null;
}