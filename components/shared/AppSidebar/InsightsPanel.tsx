import { useState } from "react";
import { ChartBarSquareIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";
import Button from "components/atoms/Button/button";
import SidebarMenuItem from "./sidebar-menu-item";

interface InsightsPanelProps {
  title: string;
  insights: DbWorkspaceRepositoryInsight[] | DbWorkspaceContributorInsight[];
  type: "repo" | "list";
  isLoading: boolean;
  workspaceId?: string | null;
}

const Loading = () => {
  return (
    <ul className="list-none w-full px-2 mt-1 [&_li]:border-l-2">
      {new Array(5).fill(0).map((_, i) => {
        return (
          <li key={i} className="p-2">
            <SkeletonWrapper height={20} />
          </li>
        );
      })}
    </ul>
  );
};

export const InsightsPanel = ({ title, insights, type, isLoading, workspaceId }: InsightsPanelProps) => {
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
      <SidebarMenuItem
        title={title}
        url={
          type === "list"
            ? `/workspaces/${workspaceId}/contributor-insights`
            : `/workspaces/${workspaceId}/repository-insights`
        }
        icon={getIcon(type)}
      />

      <div className="overflow-hidden text-ellipsis">
        {isLoading ? null : (
          <ul className="list-none w-full px-4 mt-1 [&_li]:border-l-2 text-slate-700 tracking-tight">
            {insights.length > 0 ? (
              insights.slice(0, 3).map((insight) => {
                const url =
                  type === "list"
                    ? `/workspaces/${workspaceId}/contributor-insights/${insight.id}/overview`
                    : `/workspaces/${workspaceId}/repository-insights/${insight.id}/dashboard`;
                return (
                  <li
                    className="py-1 px-3 hover:bg-slate-100 rounded-tr-md rounded-br-md transition-colors text-sm"
                    key={insight.id}
                  >
                    <Link title={title} href={url} className="items-center flex-auto flex-row align-middle block">
                      <span className="whitespace-nowrap overflow-hidden overflow-ellipsis inline-flex">
                        {insight.name}
                      </span>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="py-1 px-3 text-sm flex flex-col w-full justify-between gap-2">
                <p>You don&apos;t have any Insights yet!</p>
                <Button
                  href={`/workspaces/${workspaceId}/${
                    type === "list" ? "contributor-insights" : "repository-insights"
                  }/new`}
                  variant="outline"
                  className="!text-xs"
                >
                  Create
                </Button>
              </li>
            )}
            {insights.length > 3 ? (
              <li className="py-1 px-3 hover:bg-slate-100 rounded-tr-md rounded-br-md transition-colors text-sm">
                <Link
                  className="text-xs text-slate-500 pt-2 hover:text-orange-600"
                  title=""
                  href={
                    type === "list"
                      ? `/workspaces/${workspaceId}/contributor-insights`
                      : `/workspaces/${workspaceId}/repository-insights`
                  }
                >
                  Show all
                </Link>
              </li>
            ) : null}
          </ul>
        )}
      </div>
    </div>
  );
};
