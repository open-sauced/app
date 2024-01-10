import { PostHog } from "posthog-node";

export type FeatureFlag = "contributions_evolution_by_type" | "workspaces";

export async function getAllFeatureFlags(userId: number) {
  const client = new PostHog(
    process.env.NEXT_PUBLIC_POSTHOG_ID as string,

    { host: "https://app.posthog.com" }
  );

  const featureFlags = await client.getAllFlags(`${userId}`);

  await client.shutdownAsync();

  return featureFlags;
}
