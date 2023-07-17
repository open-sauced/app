import React from "react";
import TopContributorCard from "components/atoms/TopContributorCard/top-contributor-card";
import { useFetchTopContributors } from "lib/hooks/useFetchTopContributors";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface TopContributorsPanelProps {
  loggedInUserLogin: string;
}
const TopContributorsPanel = ({ loggedInUserLogin }: TopContributorsPanelProps) => {
  const { data, isLoading } = useFetchTopContributors();

  const topContributorsWithoutLoggedInUser = data ? data.filter((user) => user.login !== loggedInUserLogin) : [];
  const top3Contributors = topContributorsWithoutLoggedInUser.slice(0, 3).map((user) => user.login);

  return (
    <div className="flex flex-col max-w-xs gap-6 p-6 bg-white border rounded-xl">
      <h2 className="pb-2 text-2xl border-b">Top Contributors</h2>

      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 ">
            <SkeletonWrapper radius={100} height={40} width={40} /> <SkeletonWrapper height={40} classNames="w-full" />
          </div>
        ))}
      {top3Contributors.map((login, i) => (
        <TopContributorCard key={i} login={login} />
      ))}
    </div>
  );
};

export default TopContributorsPanel;
