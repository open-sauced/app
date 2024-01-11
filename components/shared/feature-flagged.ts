import { FeatureFlag } from "lib/utils/server/feature-flags";

interface FeatureFlaggedProps {
  flag: FeatureFlag;
  children: React.ReactElement;
  featureFlags: Record<FeatureFlag, boolean>;
}
export const FeatureFlagged = ({ flag, featureFlags, children }: FeatureFlaggedProps) => {
  if (featureFlags && featureFlags[flag]) {
    return children;
  }

  return null;
};
