import { Limits } from "tier";

function hasAccess(access: Limits["usage"], featureName: string) {
  return !!access.find((limit) => limit.feature === `feature:${featureName}` && limit.used < limit.limit);
}

const getFeatureAccess = async () => {
  const limits = await loadAccess();
  const hasReports = hasAccess(limits, "reports");

  return {
    hasReports,
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

type Usage = Limits["usage"];

export { getFeatureAccess, loadAccess, type Usage, hasAccess };
