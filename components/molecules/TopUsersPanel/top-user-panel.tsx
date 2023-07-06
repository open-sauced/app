import React from "react";
import TopUserCard, { TopUserCardProps } from "components/atoms/TopUserCard/top-user-card";

interface TopUsersPanelProps {
  users: TopUserCardProps[];
}
const TopUsersPanel = ({ users }: TopUsersPanelProps) => {
  return (
    <div className="flex flex-col max-w-xs gap-6 p-6 bg-white border rounded-xl">
      <h2 className="pb-2 text-2xl border-b">Top Users</h2>
      {users.map((user, i) => (
        <TopUserCard key={i} {...user} />
      ))}
    </div>
  );
};

export default TopUsersPanel;
