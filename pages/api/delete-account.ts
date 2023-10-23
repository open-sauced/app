import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/utils/supabase";

// Create a Next.js API route that receives in the request body, an action and user_id field to delete an account where the action is delete_account and the user_id is the user_id of the user to delete.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method not allowed",
    });
  }

  const sessionResponse = await supabase.auth.getSession();

  if (!sessionResponse.data.session) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      console.log(`delete ${sessionResponse.data.session.user.id}`);
      // TODO: actually delete account

      res.redirect("/?account-deleted");
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
