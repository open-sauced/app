import React from "react";
import TopContributorCard from "components/atoms/TopContributorCard/top-contributor-card";
import { useFetchTopContributors } from "lib/hooks/useFetchTopContributors";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface TopContributorsPanelProps {
  loggedInUserLogin: string;
  loggedInUserId?: number;
  refreshLoggedInUser: () => void;
}
const TopContributorsPanel = ({
  loggedInUserLogin,
  refreshLoggedInUser,
  loggedInUserId,
}: TopContributorsPanelProps) => {
  const { data, isLoading } = useFetchTopContributors({ limit: 20, userId: loggedInUserId });

  const topContributorsWithoutLoggedInUser = data ? data.filter((user) => user.login !== loggedInUserLogin) : [];
  const top3Contributors = topContributorsWithoutLoggedInUser.slice(0, 3).map((user) => user.login);

  return (
    <div className="flex flex-col w-full max-w-xs gap-5 p-6 border rounded-lg bg-light-slate-1">
      <h2 className="pb-2 text-lg border-b">Top Contributors</h2>

      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 ">
            <SkeletonWrapper radius={100} height={40} width={40} /> <SkeletonWrapper height={40} classNames="w-full" />
          </div>
        ))}
      {top3Contributors.map((login, i) => (
        <TopContributorCard key={i} login={login} refreshLoggedInUser={refreshLoggedInUser} />
      ))}
    </div>
  );
};

export default TopContributorsPanel;
