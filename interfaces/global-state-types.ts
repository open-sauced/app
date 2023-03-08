import { User } from "@supabase/gotrue-js/src/lib/types";
import { SortOptions } from "components/molecules/SortedBySelector/sorted-by-selector";

export interface GlobalStateInterface {
  user?: User | null;
  onboarded?: boolean;
  waitlisted?: boolean;
  range?: number;
  insightRepoLimit?: number;
  sortBy?: SortOptions;
}
