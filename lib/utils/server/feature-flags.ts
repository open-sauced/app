import * as Sentry from "@sentry/nextjs";

export type FeatureFlag = "contributions_evolution_by_type" | "star_search" | "starsearch-workspaces" | "oscr-rating";

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

  if (response.status !== 200) {
    Sentry.captureException(new Error("Posthog is having issues", { cause: response }));

    // Not ideal, but we don't want to block the user if Posthog is down
    return null;
  }

  const { featureFlags } = await response.json();

  if (featureFlags === undefined) {
    return null;
  }

  return featureFlags;
}
