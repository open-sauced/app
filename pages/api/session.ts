import { NextApiResponse, NextApiRequest } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import tier from "tier";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const userId = user?.user_metadata.sub as string;
    const orgInfo = await tier.lookupLimits(`org:${userId}`);

    res.json({ access: orgInfo.usage });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(401).json({ error: "No Access" });
  }
}
