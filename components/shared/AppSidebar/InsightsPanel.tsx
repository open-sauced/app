import { useState } from "react";
import { ChartBarSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarMenuItem from "./sidebar-menu-item";

interface InsightsPanelProps {
  title: string;
  username: string | null;
  insights: DbUserList[] | DbUserInsight[];
  type: "repo" | "list";
  isLoading: boolean;
}

export const InsightsPanel = ({ title, username, insights, type, isLoading }: InsightsPanelProps) => {
  const [open, setOpen] = useState(true);
  const getIcon = (type: "repo" | "list") => {
    switch (type) {
      case "list":
        return <UsersIcon className="w-5 h-5 text-slate-400" />;
      case "repo":
        return <ChartBarSquareIcon className="w-5 h-5 text-slate-400" />;
    }
  };
  return (
    <div>
      <Link
        title={"See all " + title}
        href={type === "list" ? "/hub/lists" : "/hub/insights"}
        className="hover:bg-slate-100 text-sm font-medium flex gap-1 items-center rounded-md transition-colors cursor-pointer tracking-tight p-1 group"
      >
        {getIcon(type)}
        <h3 className="py-1 text-slate-800">{title}</h3>
      </Link>
      <div className="overflow-hidden">
        {isLoading ? null : (
          <ul className="list-none w-full px-4 mt-1 [&_li]:border-l-2 text-slate-700 tracking-tight">
            {insights.slice(0, 3).map((insight) => {
              const url = type === "list" ? `/lists/${insight.id}` : `/pages/${username}/${insight.id}/dashboard`;
              return <SidebarMenuItem key={insight.id} title={insight.name} url={url} type={type} />;
            })}
            {insights.length > 3 ? (
              <Link
                className="text-xs text-slate-500 pl-3 pt-2 border-l-2 hover:text-orange-600"
                title=""
                href={type === "list" ? "/hub/lists" : "/hub/insights"}
              >
                Show all
              </Link>
            ) : (
              ""
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
