import type { Limits } from "tier";

type Feature = "insights" | "lists" | "connections" | "reports";

export const features: Feature[] = ["insights", "lists", "connections", "reports"];

function hasAccess(access: Limits["usage"], featureName: Feature) {
  return !!access.find((limit) => limit.feature === `feature:${featureName}` && limit.used < limit.limit);
}

function getUsageLimit(access: Limits["usage"], featureName: Feature) {
  const feature = access.find((limit) => limit.feature === `feature:${featureName}`);
  const used = feature?.used || 0;
  const limit = feature?.limit || 0;

  return {
    limit,
    used,
  };
}

const getFeatureAccess = async () => {
  const limits = await loadAccess();
  const hasReports = hasAccess(limits, "reports");
  const insightsLimit = getUsageLimit(limits, "insights").limit;
  const listsLimit = getUsageLimit(limits, "lists").limit;
  const insightsRepoLimit = insightsLimit > 3 ? 50 : 10;

  return {
    hasReports,
    insightsLimit,
    listsLimit,
    insightsRepoLimit,
  };
};

const loadAccess = async () => {
  const response = await fetch(`/api/session`, {
    method: "GET",
  });

  if (response.ok) {
    return (await response.json()).access as Usage;
  }

  return [] as unknown as Usage;
};

const reportUsage = async (featureName: Feature) => {
  const response = await fetch(`/api/features/report`, {
    method: "POST",
    body: JSON.stringify({ feature: featureName }),
  });

  if (response.ok) {
    return true;
  }

  return false;
};

type Usage = Limits["usage"];

export { getFeatureAccess, loadAccess, type Usage, hasAccess, reportUsage };
