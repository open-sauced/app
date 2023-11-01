import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { fetchApiData } from "helpers/fetchApiData";

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

  try {
    const {
      data: { session },
    } = await supabaseServerClient.auth.getSession();

    if (session) {
      const { error } = await fetchApiData({
        path: "/profile",
        method: "DELETE",
        bearerToken: session.access_token,
        pathValidator: () => true,
      });

      if (error) {
        throw error;
      }
    } else {
      res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.redirect("/account-deleted");
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
