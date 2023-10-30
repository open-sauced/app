import { NextApiResponse, NextApiRequest } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import tier from "tier";
import { features } from "lib/utils/feature-access";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createPagesServerClient({ req, res });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = user?.user_metadata.sub as string;
  const feature = JSON.parse(req.body).feature as string;
  const isValidFeature = features.find((featureItem) => featureItem === feature);

  if (!feature || !isValidFeature) {
    res.status(400).json({ error: "Invalid Feature Requested" });
  }

  await tier.report(`org:${userId}`, `feature:${feature}`, 1);
}
