import React from "react";
import { DashboardProps } from "components/organisms/Dashboard/dashboard";
import { useInsights } from "lib/hooks/api/useInsights";
import useContributors from "lib/hooks/api/useContributors";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useFetchUser } from "lib/hooks/useFetchUser";
import FreemiumStats from "./freemium";
import PremiumStats from "./premium";

const DashboardStatsJumbotron = ({ repositories, prData }: DashboardProps) => {
  const { data: insightsData, isLoading } = useInsights(repositories);
  const { data: contributorData, meta } = useContributors(undefined, repositories);
  const { user } = useSupabaseAuth();
  const { data: loggedInUser } = useFetchUser(user?.user_metadata.user_name);
  const isPremium = loggedInUser ? Number(loggedInUser.role) >= 50 : false;

  return (
    <>
      {isPremium && repositories ? (
        <PremiumStats prs={prData} repositories={repositories} />
      ) : (
        <FreemiumStats insights={insightsData} contributors={contributorData} contributorMeta={meta} />
      )}
    </>
  );
};

export default DashboardStatsJumbotron;
