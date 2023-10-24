import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({
      message: "Method not allowed",
    });
  }

  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    res.status(401).json({
      message: "Unauthorized",
    });
  } else {
    try {
      supabaseServerClient.auth.signOut();

      res.redirect("/account-deleted");
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
