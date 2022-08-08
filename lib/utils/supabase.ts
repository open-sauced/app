import { createClient, User } from "@supabase/supabase-js";
import { PrivateAccessTokensDBInterface } from "interfaces/database-types/private-access-tokens";

const supabaseCreds = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL : "",
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY ? process.env.NEXT_PUBLIC_SUPABASE_API_KEY : ""
};

export const supabase = createClient(
  supabaseCreds.url,
  supabaseCreds.apiKey
);

export const insertPATsIntoDB = async (userId: number, pat: string) => {
  const createdAt = Date.now();
  const isDeleted = false;

  try{
    const { data, error: dbError } = await supabase
      .from<PrivateAccessTokensDBInterface>("private_access_tokens")
      .insert([
        {
          user_id: userId,
          token: pat,
          created_at: createdAt,
          is_deleted: isDeleted
  
        }
      ]);

    if(dbError) throw dbError;
  } catch (error) {
    console.log(error);
  }
};