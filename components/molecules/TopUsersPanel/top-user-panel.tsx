import React from "react";
import { useSWRConfig } from "swr";
import TopUserCard from "components/atoms/TopUserCard/top-user-card";
import { useFetchTopUsers } from "lib/hooks/useFetchTopUsers";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface TopUsersPanelProps {
  loggedInUserLogin: string;
}
const TopUsersPanel = ({ loggedInUserLogin }: TopUsersPanelProps) => {
  const { data, isLoading } = useFetchTopUsers();
  const { mutate } = useSWRConfig();

  const topUsersWithoutLoggedInUser = data ? data.filter((user) => user.login !== loggedInUserLogin) : [];
  const top3Users = topUsersWithoutLoggedInUser.slice(0, 3).map((user) => user.login);

  return (
    <div className="flex flex-col max-w-xs gap-6 p-6 bg-white border rounded-xl">
      <h2 className="pb-2 text-2xl border-b">Top Contributors</h2>

      {isLoading &&
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 ">
            <SkeletonWrapper radius={100} height={40} width={40} /> <SkeletonWrapper height={40} classNames="w-full" />
          </div>
        ))}
      {top3Users.map((login, i) => (
        <TopUserCard refreshCallback={() => mutate(`users/${loggedInUserLogin}`)} key={i} login={login} />
      ))}
    </div>
  );
};

export default TopUsersPanel;
