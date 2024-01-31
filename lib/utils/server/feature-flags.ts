export type FeatureFlag = "contributions_evolution_by_type" | "workspaces";

export async function getAllFeatureFlags(userId: number) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.NEXT_PUBLIC_POSTHOG_ID,
      distinct_id: userId,
    }),
  };

  const response = await fetch(
    "https://app.posthog.com/decide?v=3", // or eu
    requestOptions
  );
  const { featureFlags } = await response.json();

  if (featureFlags === undefined) {
    return null;
  }

  return featureFlags;
}
