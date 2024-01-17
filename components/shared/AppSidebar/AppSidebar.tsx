import { LifebuoyIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { BiHomeAlt } from "react-icons/bi";
import SidebarMenuItem from "components/shared/AppSidebar/sidebar-menu-item";

import useUserInsights from "lib/hooks/useUserInsights";
import { useFetchAllLists } from "lib/hooks/useList";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

const SidebarLoader = () => {
  return (
    <>
      <SkeletonWrapper height={20} radius={5} count={2} classNames="w-48" />
      <SkeletonWrapper height={20} radius={5} count={1} classNames="w-28" />
    </>
  );
};

const InsightsList = ({
  username,
  insights,
  type,
}: {
  username: string | null;
  insights: DbUserList[] | DbUserInsight[];
  type: "list" | "repo";
}) => {
  return (
    <>
      {insights.map((insight) => {
        const url = type === "list" ? `/lists/${insight.id}` : `/pages/${username}/${insight.id}/dashboard`;
        return <SidebarMenuItem key={insight.id} title={insight.name} href={url} type={type} />;
      })}
    </>
  );
};

export const AppSideBar = () => {
  const { username } = useSupabaseAuth();
  const { data: rawRepoInsights, isLoading: insightsLoading } = useUserInsights(!!username);
  const { data: lists, isLoading: listsLoading } = useFetchAllLists(30, !!username);

  const repoInsights = rawRepoInsights
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const contributorInsights = lists
    .slice(0, 5)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  return (
    <div className="pt-12 bg-white flex flex-col gap-8 justify-between min-w-max min-h-full">
      <div className="grid gap-4 mt-4 px-4">
        <h2 className="flex gap-1 items-center">
          <BiHomeAlt className="w-5 h-5 text-slate-400" />
          Home
        </h2>
        <h3 className="uppercase text-gray-500 text-sm font-medium">Repo Insights</h3>
        <div className="w-full px-2 -mt-4">
          {insightsLoading ? null : <InsightsList username={username} insights={repoInsights} type="list" />}
        </div>
        <h2 className="uppercase text-gray-500 text-sm font-medium">Contributor Insights</h2>
        <div className="w-full px-2 -mt-4">
          {insightsLoading ? null : <InsightsList username={username} insights={contributorInsights} type="list" />}
        </div>

        <h3 className="uppercase text-gray-500 text-sm font-medium">Shared with you</h3>
      </div>
      <div className="mb-4">
        <SidebarMenuItem title="Support" href="/logout" icon={<LifebuoyIcon className="w-5 h-5 text-slate-400" />} />
        <SidebarMenuItem
          title="Settings"
          href="/user/settings"
          icon={<Cog8ToothIcon className="w-5 h-5 text-slate-400" />}
        />
      </div>
    </div>
  );
};
