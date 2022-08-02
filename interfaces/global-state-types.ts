import { User } from "@supabase/gotrue-js/src/lib/types";

export interface GlobalStateInterface {
  user?: User | null;
  filter?: string[] | null;
}